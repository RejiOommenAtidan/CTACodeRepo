using CTADBL.BaseClasses.Transactions;
using CTADBL.BaseClassRepositories.Masters;
using CTADBL.QueryBuilder;
using CTADBL.Repository;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;


namespace CTADBL.BaseClassRepositories.Transactions
{
    public class GBChatrelDonationRepository : ADORepository<GBChatrelDonation>
    {
        #region Constructor
        public GBChatrelDonationRepository(string connectionString) : base(connectionString)
        {

        }
        #endregion
        #region Add Call
        public void Add(GBChatrelDonation gbChatrelDonation)
        {
            var builder = new SqlQueryBuilder<GBChatrelDonation>(gbChatrelDonation);
            ExecuteCommand(builder.GetInsertCommand());
        }
        #endregion
        #region Update Call
        public void Update(GBChatrelDonation gbChatrelDonation)
        {
            var builder = new SqlQueryBuilder<GBChatrelDonation>(gbChatrelDonation);
            ExecuteCommand(builder.GetUpdateCommand());
        }
        #endregion

        #region Get Calls
        public IEnumerable<GBChatrelDonation> GetAllGBChatrelDonations()
        {
            string sql = @"SELECT `lnkgbchatreldonation`.`Id`,
                                    `lnkgbchatreldonation`.`chatrelpaymentID`,
                                    `lnkgbchatreldonation`.`sGBId`,
                                    `lnkgbchatreldonation`.`nChatrelAdditionalDonationAmt`,
                                    `lnkgbchatreldonation`.`nChatrelBusinessDonationAmt`,
                                    `lnkgbchatreldonation`.`sChatrelReceiptNumber`,
                                    `lnkgbchatreldonation`.`nAuthRegionID`,
                                    `lnkgbchatreldonation`.`sCountryID`,
                                    `lnkgbchatreldonation`.`sPaymentCurrency`,
                                    `lnkgbchatreldonation`.`sAuthRegionCurrency`,
                                    `lnkgbchatreldonation`.`nConversionRate`,
                                    `lnkgbchatreldonation`.`sPaidByGBId`,
                                    `lnkgbchatreldonation`.`dtPayment`,
                                    `lnkgbchatreldonation`.`dtEntered`,
                                    `lnkgbchatreldonation`.`nEnteredBy`,
                                    `lnkgbchatreldonation`.`dtUpdated`,
                                    `lnkgbchatreldonation`.`nUpdatedBy`
                                FROM `ctadb`.`lnkgbchatreldonation`
                                LIMIT @limit;";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("limit", Convert.ToInt32(CTAConfigRepository.GetValueByKey("SelectTotalRecordCount")));
                return GetRecords(command);
            }
        }

        public IEnumerable<GBChatrelDonation> GetGBChatrelDonationsByGBID(string sGBID)
        {
            string sql = @"SELECT `lnkgbchatreldonation`.`Id`,
                                    `lnkgbchatreldonation`.`chatrelpaymentID`,
                                    `lnkgbchatreldonation`.`sGBId`,
                                    `lnkgbchatreldonation`.`nChatrelAdditionalDonationAmt`,
                                    `lnkgbchatreldonation`.`nChatrelBusinessDonationAmt`,
                                    `lnkgbchatreldonation`.`sChatrelReceiptNumber`,
                                    `lnkgbchatreldonation`.`nAuthRegionID`,
                                    `lnkgbchatreldonation`.`sCountryID`,
                                    `lnkgbchatreldonation`.`sPaymentCurrency`,
                                    `lnkgbchatreldonation`.`sAuthRegionCurrency`,
                                    `lnkgbchatreldonation`.`nConversionRate`,
                                    `lnkgbchatreldonation`.`sPaidByGBId`,
                                    `lnkgbchatreldonation`.`dtPayment`,
                                    `lnkgbchatreldonation`.`dtEntered`,
                                    `lnkgbchatreldonation`.`nEnteredBy`,
                                    `lnkgbchatreldonation`.`dtUpdated`,
                                    `lnkgbchatreldonation`.`nUpdatedBy`
                                FROM `ctadb`.`lnkgbchatreldonation`
                                WHERE sGBID = @sGBID;";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("sGBID", sGBID);
                return GetRecords(command);
            }
        }

        public IEnumerable<GBChatrelDonation> GetChatrelDonationsByGBIDForYear(string sGBID, int year)
        {
            string sql = @"SELECT `lnkgbchatreldonation`.`Id`,
                                    `lnkgbchatreldonation`.`chatrelpaymentID`,
                                    `lnkgbchatreldonation`.`sGBId`,
                                    `lnkgbchatreldonation`.`nChatrelAdditionalDonationAmt`,
                                    `lnkgbchatreldonation`.`nChatrelBusinessDonationAmt`,
                                    `lnkgbchatreldonation`.`sChatrelReceiptNumber`,
                                    `lnkgbchatreldonation`.`nAuthRegionID`,
                                    `lnkgbchatreldonation`.`sCountryID`,
                                    `lnkgbchatreldonation`.`sPaymentCurrency`,
                                    `lnkgbchatreldonation`.`sAuthRegionCurrency`,
                                    `lnkgbchatreldonation`.`nConversionRate`,
                                    `lnkgbchatreldonation`.`sPaidByGBId`,
                                    `lnkgbchatreldonation`.`dtPayment`,
                                    `lnkgbchatreldonation`.`dtEntered`,
                                    `lnkgbchatreldonation`.`nEnteredBy`,
                                    `lnkgbchatreldonation`.`dtUpdated`,
                                    `lnkgbchatreldonation`.`nUpdatedBy`
                                FROM `ctadb`.`lnkgbchatreldonation`
                                WHERE sGBID = @sGBID
                                AND nChatrelYear = @year;";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("sGBID", sGBID);
                command.Parameters.AddWithValue("year", year);
                return GetRecords(command);
            }
            #endregion
        }
    }
}
