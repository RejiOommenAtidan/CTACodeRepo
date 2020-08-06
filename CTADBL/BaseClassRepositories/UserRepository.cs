using CTADBL.BaseClasses;
using CTADBL.QueryBuilder;
using CTADBL.Repository;
using MySql.Data.MySqlClient;
using System.Collections.Generic;

namespace CTADBL.BaseClassesRepositories
{
    public class UserRepository : ADORepository<User>
    {
        public UserRepository(string connectionString) : base(connectionString)
        {
        }
        public void Add(User user)
        {
            var builder = new SqlQueryBuilder<User>(user);
            ExecuteCommand(builder.GetInsertCommand());
        }
        public void Update(User user)
        {
            var builder = new SqlQueryBuilder<User>(user);
            ExecuteCommand(builder.GetUpdateCommand());
        }
        public void Delete(User user)
        {
            var builder = new SqlQueryBuilder<User>(user);
            ExecuteCommand(builder.GetDeleteCommand());
        }

        #region Get
        public IEnumerable<User> GetAllUser()
        {
            // DBAs across the country are having strokes over this next command!
            using (var command = new MySqlCommand("SELECT * FROM ctauser"))
            {
                return GetRecords(command);
            }
        }
        public User GetUserById(string id)
        {
            // PARAMETERIZED QUERIES!
            using (var command = new MySqlCommand("SELECT * FROM Categories WHERE CategoryID = @id"))
            {
                //command.Parameters.Add(new ObjectParameter("id", id));
                command.Parameters.AddWithValue("id", id);
                return GetRecord(command);
            }
        }
        #endregion
        public override User PopulateRecord(MySqlDataReader reader)
        {            
            return new User
            {
                User_Id = (int) reader["user_id"],
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
    }
}