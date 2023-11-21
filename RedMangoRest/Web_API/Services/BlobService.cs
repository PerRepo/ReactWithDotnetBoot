using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web_API.Services
{
    public class BlobService : IBlobService
    {
        public Task<string> GetBlob(string blobName, string containerName)
        {
            throw new NotImplementedException();
        }

        public Task<string> UpdateBlob(string blobName, string containerName)
        {
            throw new NotImplementedException();
        }

        public Task<string> UploadBlob(string blobName, string containerName, IFormFile file)
        {
            throw new NotImplementedException();
        }
    }
}