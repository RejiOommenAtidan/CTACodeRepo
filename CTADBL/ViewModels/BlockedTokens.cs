using System;
using System.Collections.Generic;
using System.Text;

namespace CTADBL.ViewModels
{
    public class BlockedTokens
    {
        private static List<string> _blockedTokens = new List<string>();

        public static List<string> Tokens { get { return _blockedTokens; } set { _blockedTokens = value; } }

        
    }
}
