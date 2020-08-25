using CTADBL.BaseClasses;
using CTADBL.QueryBuilder;
using CTADBL.Repository;
using MySql.Data.MySqlClient;
using System.Collections.Generic;

namespace CTADBL.BaseClassRepositories
{
    public class GreenbookPaymentRepository : ADORepository<GreenbookPayment>
    {
        #region Constructor
        public GreenbookPaymentRepository(string connectionString) : base(connectionString)
        { 
        }
        #endregion

        #region Get User/Users Call
        public IEnumerable<GreenbookPayment> GetAllPayments()
        {
            // DBAs across the country are having strokes over this next command!
            using (var command = new MySqlCommand("SELECT * FROM greenbookpayment"))
            {
                return GetRecords(command);
            }
        }

        public GreenbookPayment GetPaymentById(string id)
        {
            // PARAMETERIZED QUERIES!
            using (var command = new MySqlCommand("SELECT * FROM greenbookpayment WHERE greenbookid = @id"))
            {
                //command.Parameters.Add(new ObjectParameter("id", id));
                command.Parameters.AddWithValue("id", id);
                return GetRecord(command);
            }
        }
        #endregion

        #region Populate Payment Records
        public override GreenbookPayment PopulateRecord(MySqlDataReader reader)
        {
            return new GreenbookPayment
            {
                GreenbookID = (int)reader["greenbookid"],
                DateOfBirth = (System.DateTime)reader["dateofbirth"],
                EmployementYears = (int)reader["employementyears"],
                ExtraDonation = (int)reader["extradonation"],
                Name = (string)reader["name"],
                NumberOfYears = (int)reader["numberofyears"],
                TibetianAssociation = (string)reader["tibetianassociation"],
                TotalDue = (int)reader["totaldue"],
                YearOfLastPayment = (int)reader["yearoflastpayment"]
            };
        }
        #endregion

        #region Payment Add Call
        public void Add(GreenbookPayment greenbookPayment)
        {
            var builder = new SqlQueryBuilder<GreenbookPayment>(greenbookPayment);
            ExecuteCommand(builder.GetInsertCommand());
        }
        #endregion

        #region Update Payment Call
        public void Update(GreenbookPayment greenbookPayment)
        {
            var builder = new SqlQueryBuilder<GreenbookPayment>(greenbookPayment);
            ExecuteCommand(builder.GetUpdateCommand());
        }
        #endregion

        #region Delete Payment Call
        public void Delete(GreenbookPayment greenbookPayment)
        {
            var builder = new SqlQueryBuilder<GreenbookPayment>(greenbookPayment);
            ExecuteCommand(builder.GetDeleteCommand());
        }
        #endregion

    }
}
