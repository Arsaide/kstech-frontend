import React, { FC, useEffect, useState } from 'react';
import { OneProductTypes } from '@/api/models/ProductsModels';
import styles from './DescriptionSection.module.scss';
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { removeInlineStyles } from '@/utils/removeInlineStyles';

interface DescriptionSectionProps {
    data: OneProductTypes | undefined;
}

const DescriptionSection: FC<DescriptionSectionProps> = ({ data }) => {
    const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());

    useEffect(() => {
        if (data && data.description) {
            const contentState = convertFromRaw(JSON.parse(data.description));
            setEditorState(EditorState.createWithContent(contentState));
        }
    }, [data]);

    const getParsedContent = () => {
        const rawContentState = convertToRaw(editorState.getCurrentContent());
        const html = draftToHtml(rawContentState);
        return removeInlineStyles(html);
    };

    return (
        <div className={styles.cnt} id={'desc'}>
            <h4 className={styles.title}>Опис товару</h4>
            <div className={styles.content}>{getParsedContent()}</div>
        </div>
    );
};

export default DescriptionSection;
