using ChatrelDBL.BaseClasses.Transactions;
using ChatrelDBL.BaseClassRepositories.Transactions;
using ChatrelDBL.QueryBuilder;
using ChatrelDBL.Repository;
using ChatrelDBL.ViewModels;
using MySql.Data.MySqlClient;
using QRCoder;
using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;

namespace ChatrelDBL.ViewModelsRepositories
{

    
    public class UserVMRepository : ADORepository<UserVM>
    {

        private static MySqlConnection _connection;

        private GreenbookRepository _greenBookRepository;

        #region Constructor
        public UserVMRepository(string connectionString) : base(connectionString)
        {
            _connection = new MySqlConnection(connectionString);
            _greenBookRepository = new GreenbookRepository(connectionString);

        }
        #endregion

        #region Populate Records
        public override UserVM PopulateRecord(MySqlDataReader reader)
        {
            UserVM userVM = new UserVM
            {
                User = _greenBookRepository.PopulateRecord(reader),
                sJwtToken = String.Empty


            };
            return userVM;
        }
        #endregion
    }
}
