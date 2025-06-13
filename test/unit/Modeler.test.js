import Modeler from '../../lib/Modeler';

describe('Modeler', () => {
  let modeler;
  let container;

  beforeEach(() => {
    // 创建测试容器
    container = document.createElement('div');
    container.id = 'test-container';
    document.body.appendChild(container);

    // 初始化 Modeler
    modeler = new Modeler({
      container: '#test-container',
      width: '100%',
      height: '100%'
    });
  });

  afterEach(() => {
    // 清理测试容器
    document.body.removeChild(container);
  });

  it('should create a new model', () => {
    const result = modeler.createNewModel();
    expect(result).toBeDefined();
  });

  it('should import XML', () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
      <archimate:Model xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
        xmlns:archimate="http://www.opengroup.org/xsd/archimate/3.0/" 
        xsi:schemaLocation="http://www.opengroup.org/xsd/archimate/3.0/ http://www.opengroup.org/xsd/archimate/3.1/archimate3_Diagram.xsd">
        <name>Test Model</name>
        <documentation></documentation>
        <archimate:Elements>
        </archimate:Elements>
        <archimate:Views>
          <archimate:Diagrams>
            <archimate:View>
              <name>Test View</name>
              <documentation></documentation>
            </archimate:View>
          </archimate:Diagrams>
        </archimate:Views>
        <archimate:PropertyDefinitions>
        </archimate:PropertyDefinitions>
      </archimate:Model>`;

    return new Promise((resolve) => {
      modeler.importXML(xml, (err) => {
        expect(err).toBeUndefined();
        resolve();
      });
    });
  });

  it('should export XML', () => {
    return new Promise((resolve) => {
      modeler.saveXML({ format: true }, (err, xml) => {
        expect(err).toBeUndefined();
        expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
        expect(xml).toContain('<archimate:Model');
        resolve();
      });
    });
  });
}); 