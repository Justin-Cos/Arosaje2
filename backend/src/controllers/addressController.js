const User = require('../models/User');
const Address = require('../models/Address');

exports.getAllAddresses = async (req, res) => {
    try {
        const addresses = await Address.findAll();
        res.json(addresses);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur serveur');
    }
};

exports.getAddressById = async (req, res) => {
    const addressId = req.params.id;
    try {
        const address = await Address.findByPk(addressId);
        if (!address) {
            return res.status(404).json({error: 'Address not found'});
        }
        res.json(address);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur serveur');
    }
};
exports.getAddressesByUserId = async (req, res) => {
    const userId = req.params.id;
    try {
        const addresses = await Address.findAll({where: {owner: userId}});
        res.json(addresses);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur serveur');
    }
}

exports.createAddress = async (req, res) => {
    const {owner, longitude, latitude, country, city, address, zip_code} = req.body;
    try {
        const newAddress = await Address.create({owner, longitude, latitude, country, city, address, zip_code});
        res.status(201).json(newAddress);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur serveur');
    }
};

exports.updateAddressById = async (req, res) => {
    const addressId = req.params.id;
    const {owner, longitude, latitude, country, city, address, zip_code} = req.body;
    try {
        const addressToUpdate = await Address.findByPk(addressId);
        if (!addressToUpdate) {
            return res.status(404).json({error: 'Address not found'});
        }
        addressToUpdate.owner = owner ?? addressToUpdate.owner
        addressToUpdate.longitude = longitude ?? addressToUpdate.longitude
        addressToUpdate.latitude = latitude ?? addressToUpdate.latitude
        addressToUpdate.country = country ?? addressToUpdate.country
        addressToUpdate.city = city ?? addressToUpdate.city
        addressToUpdate.address = address ?? addressToUpdate.address
        addressToUpdate.zip_code = zip_code ?? addressToUpdate.zip_code;
        await addressToUpdate.save();
        res.json({message: 'Address updated successfully', address: addressToUpdate});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur serveur');
    }
};

exports.deleteAddressById = async (req, res) => {
    const addressId = req.params.id;
    try {
        const addressToDelete = await Address.findByPk(addressId);
        if (!addressToDelete) {
            return res.status(404).json({error: 'Address not found'});
        }
        await addressToDelete.destroy();
        res.json({message: 'Address deleted successfully'});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur serveur');
    }
};
