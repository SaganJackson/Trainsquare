USE [Trainsquare]
GO
/****** Object:  StoredProcedure [dbo].[Inventory_Select_ById]    Script Date: 5/3/2022 5:36:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Sagan Jackson
-- Create date: 4/1/22
-- Description:	Select By Id for Inventory
-- Code Reviewer: Guillermo Arreguin


-- MODIFIED BY: author
-- MODIFIED DATE:
-- Code Reviewer: 
-- Note:  
-- =============================================

ALTER PROC [dbo].[Inventory_Select_ById]
				@Id int

/*

	Declare @Id int = 9

	Execute [dbo].[Inventory_Select_ById] @Id

	

*/
as

BEGIN

	SELECT  i.[Id]			
			  ,i.[WorkShopId]
			  ,ws.Name
			  ,ws.Summary
			  ,ws.ImageUrl
			  ,up.FirstName
			  ,i.[Quantity]
			  ,i.[BasePrice]
			  ,i.DateCreated
			  ,i.DateModified
			  
			  
			

	FROM	[dbo].[Inventory] as i inner join dbo.WorkShop as ws
								on i.WorkShopId = ws.Id
								inner join dbo.Users as u
								on i.CreatedBy = u.id
								inner join dbo.UserProfiles as up
								on u.Id = up.id
							
	WHERE	i.Id = @Id

	ORDER BY ws.Id

END