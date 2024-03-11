import { is } from 'bpmn-js/lib/util/ModelUtil';

export default function CustomTaskBehavior(eventBus: any, modeling: any) {
  eventBus.on('element.create', 1500, function(event: any) {
    const { element } = event;

    if (is(element, 'bpmn:Task')) {
      modeling.updateProperties(element, {
        // カスタム属性を設定
        'custom:attribute': 'value'
      });
    }
  });
}

CustomTaskBehavior.$inject = ['eventBus', 'modeling'];