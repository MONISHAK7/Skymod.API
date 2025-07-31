public class PropertyDto
{
    public int Id { get; set; }
    public string Address { get; set; } = string.Empty;
    public decimal PurchasePrice { get; set; }
    public decimal SellingPrice { get; set; }
    public DateTime PurchaseDate { get; set; }
    public DateTime? SellDate { get; set; }
    public string Status { get; set; } = string.Empty;

    // You can include basic user info, not the full AppUser
    public string? UserId { get; set; }
    public string? Username { get; set; }
}
