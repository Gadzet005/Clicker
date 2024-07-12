const { WordGetterController } = require("./WordGetterController")
const assert = require('node:assert/strict');
var test = require('tape');

test("check is correct alphabnet string", async function(t) {
    function checkIsAlphString(s) {
        for (let i = 0; i < s.length; i++) {
            const ch = s[i];
            if (ch == '.' || ch == ',' || ch == '!' || ch == ':' || ch == ';') {
                continue;
            }
            if (ch < 'a' || ch > 'z') {
                return false;
            }
        }
        return true;
    }

    async function testIsAlphString(amt, hCoef) {
        let resp = {json(body) {
            this.body = body;
        }};
        await WordGetterController.GetWords({ body: { wordAmount: amt, maxWordHardness: hCoef } }, resp, ()=>{});
        const words = resp.body.words;
        words.forEach((word) => {checkIsAlphString(word) ? {} : t.ok(false)});
    }

    async function RunTests() {
        testIsAlphString(1, 0.5);
        testIsAlphString(10, 0.3);
        testIsAlphString(10000, 0.4);
        testIsAlphString(1, 0);
    }
    await RunTests();
    t.end();
});

test("check correct amount", async function(t) {
    async function testCheckAmt(amt, hCoef) {
        let resp = {json(body) {
            this.body = body;
        }};
        await WordGetterController.GetWords({ body: { wordAmount: amt, maxWordHardness: hCoef } }, resp, ()=>{});
        const words = resp.body.words;

        if (words.length != amt) {
            t.equal(words.length, amt);
        }
    }

    async function RunTests() {
        testCheckAmt(10000, 1);
    }
    await RunTests();
    t.end();
});