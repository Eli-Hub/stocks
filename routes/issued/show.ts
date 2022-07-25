import express, { Request, Response } from 'express';
import { Date as _Date } from '../../models/date';
import { Issued } from '../../models/issued';
import { requireAuth } from '../auth/require-auth';

const router = express.Router();

router.get(
	'/api/issued/:user_group/:name',
	requireAuth,
	async (req: Request<{ name: string; user_group: string }>, res: Response) => {
		const { name, user_group } = req.params;
		const issued = await Issued.findOne({
			where: { stockName: name, user_group },
		});
		console.log(issued);
		if (!issued) {
			throw new Error('could not find issued');
		}
		return res.send(issued);
	}
);

router.get(
	'/api/issued/:user_group',
	async (req: Request<{ user_group: string }>, res: Response) => {
		const { user_group } = req.params;
		const issued = await Issued.findAll({ where: { user_group } });
		if (!issued) {
			throw new Error('could not find issued');
		}
		return res.send({ issued });
	}
);

export { router as showIssuedRouter };
