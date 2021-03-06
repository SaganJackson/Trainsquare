USE [Trainsquare]
GO
/****** Object:  StoredProcedure [dbo].[Inventory_Delete_ById]    Script Date: 5/4/2022 6:28:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Sagan Jackson
-- Create date: 4/1/22
-- Description:	Delete Inventory by Id
-- Code Reviewer: Guillermo Arreguin


-- MODIFIED BY: author
-- MODIFIED DATE:
-- Code Reviewer: 
-- Note: 
-- =============================================


ALTER PROC [dbo].[Inventory_Delete_ById]
				@Id int

/*

	Declare @Id int = 79

	Execute [dbo].[Inventory_Delete_ById] @Id

	

	
*/
as

BEGIN

	DELETE
	FROM  [dbo].[Inventory]
	WHERE Id = @Id

END