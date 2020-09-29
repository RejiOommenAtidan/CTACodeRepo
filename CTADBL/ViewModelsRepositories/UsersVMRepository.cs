﻿using CTADBL.BaseClassRepositories.Transactions;
using CTADBL.Repository;
using CTADBL.ViewModels;
using MySql.Data.MySqlClient;
using System.Collections.Generic;

namespace CTADBL.ViewModelsRepositories
{
    public class UsersVMRepository : ADORepository<UsersVM>
    {
        #region Constructor
        private UserRepository _userRepository;
        public UsersVMRepository(string connectionString) : base(connectionString)
        {
            _userRepository = new UserRepository(connectionString);
        }
        #endregion

        #region Get
        public IEnumerable<UsersVM> GetUsersWithUserRightsName()
        {
            string sql = @"SELECT `users`.`Id`,
	                        `users`.`_Id`,
	                        `users`.`sUsername`,
	                        `users`.`sFullName`,
	                        `users`.`sOffice`,
	                        `users`.`sPassword`,
	                        `users`.`nUserRightsId`,
	                        IF(nActive, 1, 0) nActive,
	                        `users`.`dtEntered`,
	                        `users`.`nEnteredBy`,
	                        `users`.`dtUpdated`,
	                        `users`.`nUpdatedBy`,
	                        `userrights`.`sUserRightsName`
                        FROM tbluser AS users
                        INNER JOIN lstuserrights AS userrights ON users.nUserRightsId = userrights.Id 
                        WHERE `users`.`nActive` = 1
                        ORDER BY users.Id DESC;";
            using (var command = new MySqlCommand(sql))
            {
                return GetRecords(command);
            }
        }
        #endregion

        #region Populate Records
        public override UsersVM PopulateRecord(MySqlDataReader reader)
        {

            UsersVM usersVM = new UsersVM();
            usersVM.oUser = _userRepository.PopulateRecord(reader);
            usersVM.sUserRightsName = (string)reader["sUserRightsName"];
            return usersVM;
        }
        #endregion
    }
}