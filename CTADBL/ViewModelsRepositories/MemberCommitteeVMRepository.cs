using CTADBL.Repository;
using CTADBL.ViewModels;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Text;

namespace CTADBL.ViewModelsRepositories
{
    public class MemberCommitteeVMRepository :ADORepository<MemberCommitteeVM>
    {
        #region Constructor
        public MemberCommitteeVMRepository(string connectionString) : base(connectionString)
        {
        }
        #endregion

        #region Populate User Records
        public override MemberCommitteeVM PopulateRecord(MySqlDataReader reader)
        {
            return new MemberCommitteeVM
            {
                Committee = (string)reader["committee"],
                Committee_Id = (int)reader["committee_id"],
                Member = (string)reader["member"],
                Member_Id = (int)reader["member_id"]
            };
        }
        #endregion

        #region SP Joins Call
        public IEnumerable<MemberCommitteeVM> InnerJoin()
        {
            // PARAMETERIZED QUERIES!
            using (var command = new MySqlCommand("spGetInnerJoin"))
            {
                //command.Parameters.AddWithValue("id", id);
                return ExecuteStoredProc(command);
            }
        }
        #endregion

        #region Transaction Example
        public void Transaction()
        {
            // PARAMETERIZED QUERIES!
            using (var command = new MySqlCommand("spTransactionExample"))
            {
                //command.Parameters.AddWithValue("id", id);
                ExecuteVoidSP(command);
            }
        }
        #endregion
    }
}
