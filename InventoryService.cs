using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class InventoryService : IInventoryService
    {
        IDataProvider _data = null;
        IUserMapper _userMapper = null;



        public InventoryService(IDataProvider data, IUserMapper mapper)
        {
            _data = data;
            _userMapper = mapper;

        }

        public int Add(InventoryAddRequest model, int userId)
        {
            int id = 0;

            string procName = "[dbo].[Inventory_Insert]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddCommonParams(model, col, userId);

                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;

                    col.Add(idOut);
                },
                returnParameters: delegate (SqlParameterCollection returnCollection)
                {
                    object oId = returnCollection["@Id"].Value;
                    int.TryParse(oId.ToString(), out id);

                    
                });
            return id;
        }

        public Inventory Get(int id)
        {
            string procName = "[dbo].[Inventory_Select_ById]";

            Inventory inventory = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", id);
            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                inventory = MapInventory(reader, ref startingIndex);

            }
            );

            return inventory;
        }



        public Paged<Inventory> GetPaginate(int pageIndex, int pageSize)
        {
            Paged<Inventory> pagedResult = null;
            List<Inventory> result = null;
            int totalCount = 0;

            _data.ExecuteCmd("[dbo].[Inventory_SelectAll]",

            inputParamMapper: delegate (SqlParameterCollection parameterCollection)
            {
                parameterCollection.AddWithValue("@pageIndex", pageIndex);
                parameterCollection.AddWithValue("@pageSize", pageSize);
            },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {

                    int startingIndex = 0;
                    Inventory inventory = MapInventory(reader, ref startingIndex);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }
                    if (result == null)
                    {
                        result = new List<Inventory>();
                    }
                    result.Add(inventory);

                });
            if (result != null)
            {
                pagedResult = new Paged<Inventory>(result, pageIndex, pageSize, totalCount);
            }

            return pagedResult;
        }




        public void Delete(int id)
        {
            string procName = "[dbo].[Inventory_Delete_ById]";
            _data.ExecuteNonQuery(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", id);
            });
        }

       

        public void Update(InventoryUpdateRequest model, int userId)
        {
            string procName = "[dbo].[Inventory_Update]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddCommonParams(model, col, userId);
                    col.AddWithValue("@Id", model.Id);
                });
        }

        private Inventory MapInventory(IDataReader reader, ref int startingIndex)
        {
            Inventory inventory = new Inventory();

            inventory.Id = reader.GetSafeInt32(startingIndex++);

            inventory.WorkShopId = reader.GetSafeInt32(startingIndex++);
            inventory.WorkShopName = reader.GetSafeString(startingIndex++);
            inventory.Summary = reader.GetSafeString(startingIndex++);
            inventory.ImageUrl = reader.GetSafeString(startingIndex++);
            inventory.Host = _userMapper.Map(reader, ref startingIndex);
            inventory.Quantity = reader.GetSafeInt32(startingIndex++);
            inventory.BasePrice = reader.GetSafeDecimal(startingIndex++);
            inventory.DateCreated = reader.GetSafeDateTime(startingIndex++);
            inventory.DateModified = reader.GetSafeDateTime(startingIndex++);
            

            return inventory;


        }


        private static void AddCommonParams(InventoryAddRequest model, SqlParameterCollection col, int userId)
        {

            col.AddWithValue("@WorkShopId", model.WorkShopId);           
            col.AddWithValue("@Quantity", model.Quantity);
            col.AddWithValue("@BasePrice", model.BasePrice);           
            col.AddWithValue("@User", userId);
            

        }

     


    }
}
