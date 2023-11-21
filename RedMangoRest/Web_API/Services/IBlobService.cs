using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web_API.Services
{
    public interface IBlobService
    {
        Task<string> GetBlob(string blobName, string containerName);
        Task<string> UpdateBlob(string blobName, string containerName);
        Task<string> UploadBlob(string blobName, string containerName, IFormFile file);
    }
}