public class CreatePropertyDto
{
    public string Address { get; set; } = string.Empty;
    public decimal PurchasePrice { get; set; }
    public decimal SellingPrice { get; set; }
    public DateTime PurchaseDate { get; set; }
    public DateTime? SellDate { get; set; }
    public string Status { get; set; } = string.Empty;
}
