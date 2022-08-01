const { BN, expectRevert, expectEvent } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');
const BYX = artifacts.require('BYX');

contract('BYX', function (accounts) {

    // BYX values
    const BYX_NAME = 'Byx';
    const BYX_SYMBOL = 'BYX';

    // Supply parameters
    const MAX_TOTAL_SUPPLY = new BN(100*1000*1000);
    const AIRDROP_SUPPLY = new BN(1000);
    const INITIAL_VALUE = new BN(0);

    // Address parameters
    const owner = accounts[0];
    const ALICE = accounts[1];
    const BOB = accounts[2];
    const CHARLY = accounts[3];

    beforeEach(async function () {
        // Deploy BYX token contract
        this.byxInstance = await BYX.new({from: owner});
    });

    describe('GETTERS', () => {

        it('should return token name correctly', async function () {
            const result  = await this.byxInstance.name.call();
            expect(result).to.equal(BYX_NAME);
        });

        it('should return token symbol correctly', async function () {
            const result  = await this.byxInstance.symbol.call();
            expect(result).to.equal(BYX_SYMBOL);
        });

        it('should return max total supply correctly', async function () {
            const result  = await this.byxInstance.maxTotalSupply.call();
            expect(result).to.be.bignumber.equal(MAX_TOTAL_SUPPLY);
        });

    });

    describe('Total Supply & Mint', () => {

        it('should return total supply correctly (0 value)', async function () {
            const result  = await this.byxInstance.totalSupply.call();
            expect(result).to.be.bignumber.equal(INITIAL_VALUE);
        });

        it('should return total supply correctly after mint (1000 value)', async function () {
            const result  = await this.byxInstance.totalSupply.call();
            expect(result).to.be.bignumber.equal(INITIAL_VALUE);
            await this.byxInstance.mint(ALICE, AIRDROP_SUPPLY);
            const newResult  = await this.byxInstance.totalSupply.call();
            expect(newResult).to.be.bignumber.equal(AIRDROP_SUPPLY);
        });

        it('should return total supply correctly after multiple mint (3000 value)', async function () {
            const result  = await this.byxInstance.totalSupply.call();
            expect(result).to.be.bignumber.equal(INITIAL_VALUE);
            await this.byxInstance.mint(ALICE, AIRDROP_SUPPLY);
            await this.byxInstance.mint(BOB, AIRDROP_SUPPLY);
            await this.byxInstance.mint(CHARLY, AIRDROP_SUPPLY);
            const newResult  = await this.byxInstance.totalSupply.call();
            const THREE_AIRDROP_SUPPLY = new BN(3 * AIRDROP_SUPPLY);
            expect(newResult).to.be.bignumber.equal(THREE_AIRDROP_SUPPLY);
        });

        it('should mint token on appropriate addresses', async function () {
            await this.byxInstance.mint(ALICE, AIRDROP_SUPPLY);
            await this.byxInstance.mint(BOB, AIRDROP_SUPPLY);
            await this.byxInstance.mint(CHARLY, AIRDROP_SUPPLY);
            const aliceBalance  = await this.byxInstance.balanceOf.call(ALICE);
            expect(aliceBalance).to.be.bignumber.equal(AIRDROP_SUPPLY);
            const bobBalance  = await this.byxInstance.balanceOf.call(BOB);
            expect(bobBalance).to.be.bignumber.equal(AIRDROP_SUPPLY);
            const charlyBalance  = await this.byxInstance.balanceOf.call(CHARLY);
            expect(charlyBalance).to.be.bignumber.equal(AIRDROP_SUPPLY);
        });
    });
});