import { Injectable } from '@angular/core';
import * as Web3 from 'web3/dist/web3.min.js';
import { Account } from '../models/account';
import { Token } from '../models/token';
// import { User } from '../models/user.js';

declare let require: any;
declare let window: any;

let tokenAbi = require('../../build/contracts/citexToken.json');

@Injectable({
    providedIn: 'root'
})

export class TokenService {
    private web3Provider: null;

    constructor() {
        if (typeof window.web3 !== 'undefined') {
            this.web3Provider = window.web3.currentProvider;
            //console.log(this.web3Provider)
        } else {
            this.web3Provider = new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws');
        }
        window.web3 = new Web3(this.web3Provider);
    }

    // returns promsie; 
    // if contract found resolves it
    // else if address is invalid it rejects 'Contract not found' or 'invalid address'
    // ToDo: what if provider not found
    async _citexToken()
    async _citexToken(_address)
    
    async _citexToken(_address?: string) {
        const networkId = await window.web3.eth.net.getId()
        let address = (_address) ? (_address) : (tokenAbi.networks[networkId].address)
        if (!address) throw Error('Contract not found')
        const CitexToken = new window.web3.eth.Contract(tokenAbi.abi, address)
        return CitexToken
    }

    /**
     * getters
     */
    async getTokenInfo(): Promise<Token>
    async getTokenInfo(_address): Promise<Token>

    async getTokenInfo(_address?: string): Promise<Token> {
        let CitexToken = (_address) ? (await this._citexToken(_address)) : (await this._citexToken());
        
        let address = CitexToken.options.address;
        let owner = await CitexToken.methods.owner().call()
        let name = await CitexToken.methods.name().call()
        let symbol = await CitexToken.methods.symbol().call()
        let decimals = await CitexToken.methods.decimals().call()
        let totalSupply = await CitexToken.methods.totalSupply().call()
        totalSupply = window.web3.utils.fromWei(totalSupply, 'ether')

        return { address, owner, name, symbol, totalSupply, decimals }
    }

    async getAccount() {
        const account = await window.web3.eth.getCoinbase()
        return account
    }

    async getEtherBalance(account) {
        const balance = await window.web3.eth.getBalance(account)
        return (window.web3.utils.fromWei(balance, 'ether'))
    }

    async getTokenBalance(account) {
        const CitexToken = await this._citexToken()
        const balance = await CitexToken.methods.balanceOf(account).call()
        return (window.web3.utils.fromWei(balance, 'ether'))
    }

    async getAccountInfo(): Promise<Account>
    async getAccountInfo(_address): Promise<Account>

    async getAccountInfo(_address?): Promise<Account> {
        let address = _address ? _address : (await this.getAccount());
        let balance: Number = await this.getEtherBalance(address)
        let tokens: Number = await this.getTokenBalance(address)
        return {
            address: address,
            balance: balance, 
            tokens: tokens
        }
    }

    // async getUserByEmail(_emailHash): Promise<User> {
    //     const fromAddress = await this.getAccount()
    //     const CitexToken = await this._citexToken()
    //     const tokens = await CitexToken.methods.getUserInfo(_emailHash).call({from: fromAddress})
    //     const weiTokens = window.web3.utils.fromWei(tokens, 'ether')
    //     return {email: _emailHash, tokens: weiTokens}
    // }

    // async getUserById(_id) {
    //     const fromAddress = await this.getAccount()
    //     const CitexToken = await this._citexToken()
    //     const user = await CitexToken.methods.emails(_id).call({from: fromAddress})
    //     //console.log(user)
    //     return user
    // }

    /**
     * Setters
     */
    async transferToken(_transferTo, _amount) {
        const weiAmount = window.web3.utils.toWei(_amount, 'ether')
        console.log(_amount)
        const CitexToken = await this._citexToken()
        return CitexToken.methods.transfer(_transferTo, weiAmount)
    }

    async updateUser(_emailHash, _balance) {
        const weiBalance = window.web3.utils.toWei(_balance, 'ether')
        const CitexToken = await this._citexToken()
        return CitexToken.methods.setUserInfo(_emailHash, weiBalance)
    }

}
