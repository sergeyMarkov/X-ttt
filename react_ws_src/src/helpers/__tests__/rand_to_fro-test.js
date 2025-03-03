jest.unmock('../rand_to_fro')
import rand_to_fro from '../rand_to_fro'


 describe('rand_to_fro function', () => {
  
  it('should generate a random value between mn and mx inclusive', () => {
    const mx = 5;
    const mn = 0;

    const result = rand_to_fro(mx, mn);
    expect(result).toBeGreaterThan(mn-1);
    expect(result).toBeLessThan(mx+1);
  });


  it('should generate an integer value', () => {
    const mx = 10;
    const mn = 0;

    const result = rand_to_fro(mx, mn);
    expect(Number.isInteger(result)).toBe(true);
  });

});
