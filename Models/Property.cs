public class Property
{
    public int Id { get; set; }
    public string Address { get; set; } = string.Empty;
    public decimal PurchasePrice { get; set; }
    public decimal SellingPrice { get; set; }
    public DateTime PurchaseDate { get; set; }
    public DateTime? SellDate { get; set; }
    public string Status { get; set; } = "Available";

    public string UserId { get; set; } = string.Empty;  // FK to AppUser
    public AppUser? User { get; set; }   // If you're using Identity or custom User
}
