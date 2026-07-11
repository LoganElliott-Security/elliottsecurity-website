import type { Blockquote, Paragraph, Root, RootContent } from 'mdast';

const CALLOUT_PATTERN = /^\[!([A-Z]+)\]\s*$/i;

const CALLOUT_CLASS_MAP: Record<string, string> = {
	WARNING: 'markdown-callout-warning',
	TIP: 'markdown-callout-tip',
	IMPORTANT: 'markdown-callout-important',
	EXAMPLE: 'markdown-callout-example',
	CALLOUT: 'markdown-callout-callout',
	NOTE: 'markdown-callout-callout',
};

/**
 * Transforms GitHub-style alert blockquotes into HTML callout containers.
 * Usage in Markdown:
 * > [!WARNING]
 * > This is a warning message.
 */
export function remarkCallouts() {
	return function transform(tree: Root) {
		if (!tree.children) return;

		const nextChildren: RootContent[] = [];

		for (const node of tree.children) {
			if (node.type !== 'blockquote') {
				nextChildren.push(node);
				continue;
			}

			const callout = transformBlockquote(node);
			nextChildren.push(...callout);
		}

		tree.children = nextChildren;
	};
}

function transformBlockquote(node: Blockquote): RootContent[] {
	const children = node.children ?? [];
	const firstParagraph = children[0];

	if (!firstParagraph || firstParagraph.type !== 'paragraph') {
		return [node];
	}

	const paragraphChildren = (firstParagraph as Paragraph).children ?? [];
	const firstText = paragraphChildren[0];

	if (!firstText || firstText.type !== 'text') {
		return [node];
	}

	const match = firstText.value.match(CALLOUT_PATTERN);
	if (!match) {
		return [node];
	}

	const calloutType = match[1].toUpperCase();
	const className = CALLOUT_CLASS_MAP[calloutType] ?? 'markdown-callout-callout';
	const label = calloutType.charAt(0) + calloutType.slice(1).toLowerCase();
	const remaining = children.slice(1);
	const innerHtml = remaining.length > 0 ? serializeChildren(remaining) : '';

	return [
		{
			type: 'html',
			value: `<div class="markdown-callout ${className}"><p class="markdown-callout-title">${label}</p>${innerHtml}</div>`,
		},
	];
}

function serializeChildren(nodes: Blockquote['children']): string {
	return nodes
		.map((node) => {
			if (node.type === 'paragraph') {
				const text = node.children
					.map((child) => (child.type === 'text' ? child.value : ''))
					.join('');
				return `<p>${escapeHtml(text)}</p>`;
			}

			if (node.type === 'list') {
				const items = node.children
					.map((item) => {
						const firstParagraph = item.children[0];
						if (!firstParagraph || firstParagraph.type !== 'paragraph') {
							return '';
						}

						const itemText = firstParagraph.children
							.map((child) => (child.type === 'text' ? child.value : ''))
							.join('');
						return `<li>${escapeHtml(itemText)}</li>`;
					})
					.join('');
				const tag = node.ordered ? 'ol' : 'ul';
				return `<${tag}>${items}</${tag}>`;
			}

			return '';
		})
		.join('');
}

function escapeHtml(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}
