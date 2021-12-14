import express, { Request, Response } from 'express';
import { Equipment } from '../../models/equipment';

const router = express.Router();

interface ReqBody {
	name: string;
	current_l1?: number;
	current_l2?: number;
	current_l3?: number;
	power_kw?: number;
	power_kva?: number;
	utilization?: number;
	remark?: string;
}

router.put(
	'/api/equipment/:date/:name',
	async (
		req: Request<{ name: string; date: string }, {}, ReqBody>,
		res: Response
	) => {
		const { name, date } = req.params;
		const equipment = await Equipment.findOne({ name, date });
		if (!equipment) {
			throw new Error('equipment does not exist');
		}

		equipment.set({ ...req.body });
		await equipment.save();
		return res.send(equipment);
	}
);

export { router as updateRouter };
