
ALTER PROC dbo.Inventory_Search_Paginated
			@pageIndex int
			,@pageSize int
			,@Query nvarchar(100)

AS

/*
DECLARE
			@pageIndex int = 0
			,@pageSize int = 10
			,@Query nvarchar(100) = 'you'
	

EXECUTE [dbo].[Inventory_Search_Paginated]
	
			@pageIndex 
			,@pageSize
			,@Query 


			

*/

BEGIN

		Declare @Offset int = @PageIndex * @PageSize

SELECT i.[Id]
			  ,i.[WorkShopId]
			  ,ws.Name
			  ,ws.Summary
			  ,ws.ShortDescription
			  ,ws.ImageUrl
			  ,up.FirstName
			  ,up.LastName
			  ,i.[Quantity]
			  ,i.[BasePrice]
			  ,i.CreatedBy
			  ,i.DateCreated
			  ,i.DateModified
	  
	  ,TotalCount = COUNT (1) OVER() 

FROM [dbo].[Inventory] as i inner join dbo.WorkShop as ws
								on i.WorkShopId = ws.Id
								inner join dbo.Users as u
								on i.CreatedBy = u.Id
								inner join dbo.UserProfiles as up
								on u.Id = up.Id

WHERE	( 
(ws.Name LIKE '%' + @Query + '%')
or
(ws.ShortDescription LIKE '%' + @Query + '%')
)
or
(up.FirstName LIKE '%' + @Query + '%')
		 		
		ORDER BY up.FirstName 
		OFFSET @Offset ROWS
		FETCH NEXT @PageSize ROWS ONLY;

END