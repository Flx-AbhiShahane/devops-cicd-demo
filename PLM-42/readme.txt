28-Apr-2025
PLM-42 Drop 01

This Folder contains changes for ticket no PLM-42 (Characteristic search grid brings in Value and not the Label. Change to Label.)

Changes:
Following fixes are included in this package:

1. PLM-42 - Characterstic search used to show Value instead of Label for List properties. Now label is shown.
2. PLM-18 - Blank Values were exported (for List properties) to Excel from Part Characterstic Tab.
3. PLM-18 - Handled case where blank value was exported if property value contained ',' in List Value definition
4. PLM-18 - Handled case where property value was no longer present in List Value definition


Contents:
---------
The changes include:
 - ArasPackage
 - Codetree

Deploy Changes:
---------------

NOTE: 
PLM-42 package also contains the changes for PLM-18. So just applying this package is sufficient.
Earlier provided PLM-18 package should NOT be applied after applying PLM-42.

1) Apply ArasPackage

To apply this package you can use Aras 15 package import tool.

Use following options while importing:
	Target Release: 15
	Description: PLM-42 Drop 01
	Type: Merge
	Mode: Thorough Mode

2) Apply Codetree

Copy Codetree content into similar location. Please note that it will overwrite existing contents and so take backup of the existing contents before copying.

Increment filesRevision value in following line in file: Innovator\Client\InnovatorClient.config

<cachingModule moduleEnabled="true" filesRevision="8" />

Recycle Aras Application pool in IIS

Logout and Login back to verify the changes. In case Codetree update is not reflected then clear the browser cache and test again.