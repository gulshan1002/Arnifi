describe('Application Tests', () => {
    test('hello world!', () => {
        expect(1 + 1).toBe(2);
    });

    test('this test will fail', () => {
        expect(2 * 2).toBe(5); // This will fail
    });
});