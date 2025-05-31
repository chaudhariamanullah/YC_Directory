import "server-only"

import { apiVersion, dataset, projectId , token} from '../env'
import {createClient} from 'next-sanity'

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, 
  token,
})

if (!writeClient.config().token)
    throw new Error("No Write Token Found")