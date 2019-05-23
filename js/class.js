class Node {
	constructor(_id,_type,_name, _partners, _administrator, _asset, _assetActive,_objective ='',_communityMember =[]) {
		this.id = _id;
		this.type = _type;
		this.name = _name;
		this.partners = _partners;
		this.administrator = _administrator; 
		this.asset = _asset;
		this.assetActive = _assetActive;
		// only for a community manager
		this.objective =_objective;
		this.communityMember =_communityMember;
	}
}

class Link {
	constructor(_id, _type, _source, _destination,_name, _weightSrc=0, _weightDest =0 ) {
		this.id = _id;
		this.type = _type;
		this.name = _name;
		this.source = _source; // for conventions, ID of agent
		this.destination = _destination; // for conventions ID of agent
		this.weightSrc = _weightSrc;
		this.weightDest = _weightDest;
	}
}

class Asset {
	constructor(_id,_type, _functionType, _functionCharac, _Pmincap, _Pmaxcap,_Pmint, _Pmaxt, _uncertaintyType, _uncertainCharac, _GPS) {
		this.id = _id;
		this.type = _type; // Flexible, uncontrollable, uncertain
		this.functionType = _functionType; // ex : Quadratique
		this.functionCharac = _functionCharac;
		this.Pmincap = _Pmincap;
		this.Pmaxcap = _Pmaxcap;
		this.Pmint = _Pmint; // empty string if the powers are constant
		this.Pmaxt = _Pmaxt; // empty string if the powers are constant
		this.uncertaintyType = _uncertaintyType; // empty string for the type flexible or uncontrollable
		this.uncertainCharac = _uncertainCharac; // empty string for the type flexible or uncontrollable
		this.GPS = _GPS; 
	}
}
