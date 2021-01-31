namespace ChatrelPaymentWebAPI.Services
{
    public class AppSettings
    {
        #region Private Prop
        private string _sSecret { get; set; }
        #endregion

        #region Public Prop
        public string sSecret { get { return _sSecret; } set { _sSecret = value; } } 
        #endregion
    }
}
