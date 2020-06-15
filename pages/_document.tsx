import {
	DocumentInitialProps,
	RenderPageResult,
} from 'next/dist/next-server/lib/utils';
import Document, { DocumentContext } from 'next/document';

//FIXME: FOUC here, have example on material but unsure for font awesome and bulma:

class MoviesDocument extends Document {
	static async getInitialProps (
		ctx: DocumentContext,
	): Promise<DocumentInitialProps> {
		const originalRenderPage = ctx.renderPage;

		ctx.renderPage = (): RenderPageResult | Promise<RenderPageResult> =>
			originalRenderPage({
				// useful for wrapping the whole react tree
				enhanceApp: App => App,
				// useful for wrapping in a per-page basis
				enhanceComponent: Component => Component,
			});

		// Run the parent `getInitialProps`, it now includes the custom `renderPage`
		const initialProps = await Document.getInitialProps(ctx);

		return initialProps;
	}
}

export default MoviesDocument;
