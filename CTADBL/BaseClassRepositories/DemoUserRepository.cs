using CTADBL.BaseClasses;
using CTADBL.QueryBuilder;
using CTADBL.Repository;
using MySql.Data.MySqlClient;
using System.Collections.Generic;

namespace CTADBL.BaseClassRepositories
{
    public class DemoUserRepository : ADORepository<DemoUser>
    {
        #region Constructor
        public DemoUserRepository(string connectionString) : base(connectionString)
        {
        }
        #endregion

        #region User Add Call
        public void Add(DemoUser user)
        {
            var builder = new SqlQueryBuilder<DemoUser>(user);
            ExecuteCommand(builder.GetInsertCommand());
        }
        #endregion

        #region Update User Call
        public void Update(DemoUser user)
        {
            var builder = new SqlQueryBuilder<DemoUser>(user);
            ExecuteCommand(builder.GetUpdateCommand());
        }
        #endregion

        #region Delete User Call
        public void Delete(DemoUser user)
        {
            var builder = new SqlQueryBuilder<DemoUser>(user);
            ExecuteCommand(builder.GetDeleteCommand());
        }
        #endregion

        #region Get User/Users Call (SP & Normal)
        public IEnumerable<DemoUser> GetAllUser()
        {
            // DBAs across the country are having strokes over this next command!
            using (var command = new MySqlCommand("SELECT * FROM ctauser"))
            {
                return GetRecords(command);
            }
        }

        public DemoUser GetUserById(string id)
        {
            // PARAMETERIZED QUERIES!
            using (var command = new MySqlCommand("SELECT * FROM ctauser WHERE user_id = @id"))
            {
                //command.Parameters.Add(new ObjectParameter("id", id));
                command.Parameters.AddWithValue("id", id);
                return GetRecord(command);
            }
        }

        public IEnumerable<DemoUser> GetUsersUsingSP()
        {
                // PARAMETERIZED QUERIES!
                using (var command = new MySqlCommand("spGetAllUsers"))
                {
                    //command.Parameters.AddWithValue("id", id);
                    return ExecuteStoredProc(command);
                }
        }

        public DemoUser GetUserUsingSP(string userID)
        {
            try
            {
                // PARAMETERIZED QUERIES!
                using (var command = new MySqlCommand("CALL spGetUserByUserID(@inputUser_id)"))
                {
                    command.Parameters.AddWithValue("inputUser_id", userID);
                    return GetRecord(command);
                }
            }
            catch (System.Exception ex)
            {

                throw ex;
            }
        }
        #endregion

        #region Populate User Records
        public override DemoUser PopulateRecord(MySqlDataReader reader)
        {
            return new DemoUser
            {
                User_Id = (int)reader["user_id"],
                //User_Id = reader.GetInt32(0),
                Username = reader.GetString(1),
                Fullname = reader.GetString(2),
                Email = reader.GetString(3),
                Password = reader.GetString(4),
                Confirm_Password = reader.GetString(5),
                Role = reader.GetString(6),
                Region = reader.GetString(7),
                Status = reader.GetString(8)
            };
        }
        #endregion
    }
}