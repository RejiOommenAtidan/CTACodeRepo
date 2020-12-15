using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Reflection;

namespace CTAWebAPI.Services
{
    public static class CTAAuditLogger
    {
        /// <summary>
        /// Returns Array of String [0] - Old, [1] - New
        /// </summary>
        /// <typeparam name="T">Object of a Type</typeparam>
        /// <param name="oOld">Old Object</param>
        /// <param name="oNew">New Object</param>
        /// <returns></returns>
        public static string[] ReturnStrings<T>(T oOld, T oNew) where T : class
        {
            string sSeparator = ", ";
            List<string> lFieldValuesOld = new List<string>();
            List<string> lFieldValuesNew = new List<string>();

            string[] aStringReturn = new string[2];

            if (oOld != null && oNew != null)
            {
                Type type = typeof(T);

                #region Audit Props to Ignore
                List<string> ignoreList = new List<string>
                {
                    "dtEntered",
                    "dtUpdated",
                    "nEnteredBy",
                    "nUpdatedBy"
                };
                #endregion

                foreach (PropertyInfo pi in type.GetProperties(BindingFlags.Public | BindingFlags.Instance))
                {
                    if (!ignoreList.Contains(pi.Name))
                    {
                        object sOldvalue = type.GetProperty(pi.Name).GetValue(oOld, null);
                        object sNewValue = type.GetProperty(pi.Name).GetValue(oNew, null);

                        PropertyInfo commonPI = type.GetProperty(pi.Name);
                        object[] displayNameAttributeCommon = commonPI.GetCustomAttributes(typeof(DisplayNameAttribute), false);
                        string sDisplayNameCommon = displayNameAttributeCommon.Length > 0 ? (displayNameAttributeCommon[0] as DisplayNameAttribute).DisplayName : pi.Name;

                        if (sOldvalue != sNewValue && (sOldvalue == null || !sOldvalue.Equals(sNewValue)) && sOldvalue!=null && sNewValue!=null)
                        {
                            string sOldStringToJoin = sDisplayNameCommon + " " + "=" + " " + sOldvalue.ToString();
                            string sNewStringToJoin = sDisplayNameCommon + " " + "=" + " " + sNewValue.ToString();

                            lFieldValuesOld.Add(sOldStringToJoin);
                            lFieldValuesNew.Add(sNewStringToJoin);
                        }
                    }
                }

                string sFieldValuesOld = string.Join(sSeparator, lFieldValuesOld);
                string sFieldValuesNew = string.Join(sSeparator, lFieldValuesNew);

                aStringReturn[0] = sFieldValuesOld;
                aStringReturn[1] = sFieldValuesNew;
                return aStringReturn;
            }
            return null;
        }
    }
}
