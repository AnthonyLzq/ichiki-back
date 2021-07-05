import { Response, Request, Router } from 'express'
import { response } from '../utils'

const Home = Router()

Home.route('')
  .get((req: Request, res: Response) => {
    response(
      false,
      'Welcome to Ichiki\'s backend!',
      res,
      200
    )
  })

export { Home }
