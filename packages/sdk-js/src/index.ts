import axios, { AxiosInstance } from 'axios';
import {
	ItemsHandler,
	ServerHandler,
	UtilsHandler,
	ActivityHandler,
	FoldersHandler,
	PermissionsHandler,
	PresetsHandler,
	RolesHandler,
	UsersHandler,
	SettingsHandler,
	FilesHandler,
	CollectionsHandler,
	FieldsHandler,
	AuthHandler,
	AuthOptions,
} from './handlers';
import { MemoryStore } from './utils';

export default class DirectusSDK {
	axios: AxiosInstance;
	authOptions: AuthOptions;

	constructor(url: string, options?: { auth: Partial<AuthOptions> }) {
		this.axios = axios.create({
			baseURL: url,
		});

		this.authOptions = {
			storage: options?.auth?.storage || new MemoryStore(),
			mode: options?.auth?.mode || 'cookie',
			autoRefresh: options?.auth?.autoRefresh || true,
		};
	}

	get url() {
		return this.axios.defaults.baseURL!;
	}

	set url(val: string) {
		this.axios.defaults.baseURL = val;
	}

	items(collection: string) {
		if (collection.startsWith('directus_')) {
			throw new Error(`You can't read the "${collection}" collection directly.`);
		}

		return new ItemsHandler(collection, this.axios);
	}

	get server() {
		return new ServerHandler(this.axios);
	}

	get utils() {
		return new UtilsHandler(this.axios);
	}

	get activity() {
		return new ActivityHandler(this.axios);
	}

	get folders() {
		return new FoldersHandler(this.axios);
	}

	get permissions() {
		return new PermissionsHandler(this.axios);
	}

	get presets() {
		return new PresetsHandler(this.axios);
	}

	get roles() {
		return new RolesHandler(this.axios);
	}

	get users() {
		return new UsersHandler(this.axios);
	}

	get settings() {
		return new SettingsHandler(this.axios);
	}

	get files() {
		return new FilesHandler(this.axios);
	}

	get collections() {
		return new CollectionsHandler(this.axios);
	}

	get fields() {
		return new FieldsHandler(this.axios);
	}

	get auth() {
		return new AuthHandler(this.axios, this.authOptions);
	}
}
