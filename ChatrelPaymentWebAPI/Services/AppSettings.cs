namespace ChatrelPaymentWebAPI.Services
{
    public class AppSettings
    {
        #region Public Prop
        private string _sSecret { get; set; }
        #endregion

        #region Private Prop
        public string sSecret { get { return _sSecret; } set { _sSecret = value; } } 
        #endregion
    }
}
