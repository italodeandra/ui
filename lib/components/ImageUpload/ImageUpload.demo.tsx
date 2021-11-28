import { VFC } from "react";
import DemoTemplate from "../../../src/components/DemoTemplate/DemoTemplate";
import ImageUpload from "./ImageUpload";

const ImageUploadDemo: VFC = () => (
  <DemoTemplate title header={"Button"}>
    <ImageUpload
      labelInput={"Images"}
      onChange={console.info}
      value={[]}
      labelMyDevice={"Meu dispositivo"}
      labelEdit={"Alterar descrição"}
      labelDelete={"Remover imagem"}
      labelAltText={"Descrição"}
      labelClose={"Fechar"}
      labelEditDialogContent={
        "A descrição será utilizada como alternativa para a imagem."
      }
      labelDropFilesBrowseImport={
        "Solte imagens aqui, cole, {browse} ou importe de"
      }
      labelBrowse={"navegue"}
      labelDropFilesHere={"Solte seus arquivos aqui"}
      labelFieldIsRequired={"Esse campo é obrigatório"}
    />
  </DemoTemplate>
);

export default ImageUploadDemo;
