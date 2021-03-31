using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;

namespace CTADBL.Repository
{
    public abstract class ADORepository<T> where T : class
    {
        #region Constructor
        private static MySqlConnection _connection;
        public ADORepository(string connectionString)
        {
            _connection = new MySqlConnection(connectionString);
        }
        #endregion

        #region Generic Populate Record
        public virtual T PopulateRecord(MySqlDataReader reader)
        {
            return null;
        }
        #endregion

        #region Generic Get Record/Records
        protected IEnumerable<T> GetRecords(MySqlCommand command)
        {
            var list = new List<T>();
            command.Connection = _connection;
            if(command.Connection.State == ConnectionState.Closed)
            {
                _connection.Open();
            }
            
            try
            {
                var reader = command.ExecuteReader();
                try
                {
                    while (reader.Read())
                        list.Add(PopulateRecord(reader));
                }
                catch(Exception ex)
                {
                    Console.WriteLine(ex.Message);
                    throw; 
                }
                finally
                {
                    // Always call Close when done reading.
                    reader.Close();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
            }
            finally
            {
                _connection.Close();
            }
            return list;
        }
        protected T GetRecord(MySqlCommand command)
        {
            T record = null;
            command.Connection = _connection;
            _connection.Open();
            try
            {
                var reader = command.ExecuteReader();
                try
                {
                    while (reader.Read())
                    {
                        record = PopulateRecord(reader);
                        break;
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                    throw;
                }
                finally
                {
                    // Always call Close when done reading.
                    reader.Close();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
            }
            finally
            {
                _connection.Close();
            }
            return record;
        }
        #endregion

        #region Generic SP Call
        protected IEnumerable<T> ExecuteStoredProc(MySqlCommand command)
        {
            var list = new List<T>();
            command.Connection = _connection;
            command.CommandType = CommandType.StoredProcedure;
            _connection.Open();
            try
            {
                var reader = command.ExecuteReader();
                try
                {
                    while (reader.Read())
                    {
                        var record = PopulateRecord(reader);
                        if (record != null) list.Add(record);
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
                finally
                {
                    // Always call Close when done reading.
                    reader.Close();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            finally
            {
                _connection.Close();
            }
            return list;
        }
        #endregion

        #region Generic Execute Command Call
        protected int ExecuteCommand(MySqlCommand command)
        {
            command.Connection = _connection;
            command.CommandType = CommandType.Text;
            _connection.Open();
            try
            {
                return command.ExecuteNonQuery();
            }
            catch(MySqlException ex)
            {
                throw;
            }
            finally
            {
                _connection.Close();
            }
        }

        protected void ExecuteVoidSP(MySqlCommand command)
        {
            command.Connection = _connection;
            command.CommandType = CommandType.StoredProcedure;
            MySqlTransaction mySqlTransaction;
            // Start a local transaction
            
            _connection.Open();
            //Do After opening Connection only 
            mySqlTransaction = _connection.BeginTransaction();
            // Must assign both transaction object and connection
            // to Command object for a pending local transaction
            ////Already Done one up
            //command.Connection = _connection;
            command.Transaction = mySqlTransaction;
            try
            {
                command.ExecuteNonQuery();
                //Commit in Db once Success
                mySqlTransaction.Commit();
            }
            catch (Exception ex) {
                try
                {
                    //Try Rolling Back
                    mySqlTransaction.Rollback();
                }
                catch (MySqlException mySqlEx)
                {
                    //if any prob in Rolling back
                    throw;
                }
                //Throw Actual Excep to Show in Controller Level
                throw;
            }
            finally
            {
                //Close any way
                _connection.Close();
            }
        }
        #endregion
    }
}