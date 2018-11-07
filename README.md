# DeepaMehta 5 Topic List

## Example

```html
<dm5-topic-list :topics="resultTopics" empty-text="No Match" @topic-click="myHandler">
```

## Properties

| Property  | Type                                                  | Required               | Description                                  |
| --------  | ----                                                  | --------               | -----------                                  |
| topics    | Array of dm5.Topic or dm5.RelatedTopic, may be empty  | yes                    | Topics to render in the list                 |
| emptyText | String                                                | no, default: "No Data" | Text to display when `topics` array is empty |

## Events

| Event         | Description                              | Argument                                     |
| -----         | -----------                              | --------                                     |
| `topic-click` | When the user clicks a topic in the list | The clicked topic, as in the `topics` array. |

## Version History

**0.6** -- Nov 7, 2018

* Improvement: new component attribute `no-sort-menu` allows hiding the sort menu
* Fix: no endless recursion while calculating topic groups

**0.5** -- Oct 21, 2018

* Fix: render Font Awesome icons with font-smoothing

**0.4** -- Oct 6, 2018

* Feature: new component attribute `marker-ids` allows rendering certain topics as "marked"

**0.3** -- Jul 31, 2018

* Add GitLab CI/CD

**0.2** -- Mar 25, 2018

* Renders plain `Topic`s as well (besides `RelatedTopic`s)
* New prop `empty-text` allows customization of the "No Data" text

**0.1** -- Mar 22, 2018

* Factored out as a standalone component from:  
  https://github.com/jri/dm5-detail-panel

------------
Jörg Richter  
Nov 7, 2018
