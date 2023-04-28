import './ItemDetailEdit.scss';
import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faCheck, faMultiply } from '@fortawesome/free-solid-svg-icons';
import { capitalizeAndMapInformationField } from 'src/helpers/capitalize';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BASIC_FIELDS } from 'src/configs/constants';
import { useMediaQuery } from 'react-responsive';

export const ItemDetailEdit: React.FC<IItemDetailEdit> = ({
  item,
  isPoint,
  usingLanguage,
  query,
  callbackUpdateDetail,
  mobileCalledEditDetail,
  resetItemDetail
}) => {
  const history = useHistory();
  const [itemDetail, setItemDetail] = useState<any>({});
  const [newItemValue, setNewItemValue] = useState<string>("");
  const backupItemDetail = useRef<any>({});
  const { t } = useTranslation();
  const isDesktop = useMediaQuery({ query: '(min-width: 1080px)' });

  useEffect(() => {
    //Fill if missing some fields
    let listOfFields = isPoint ? BASIC_FIELDS["point"] : BASIC_FIELDS["meridian"];
    let fields = listOfFields.map(item => {
      return item.field
    })
    const currentFields = Object.keys(item)

    let itemDetail = {}
    fields.forEach(field => {
      if (currentFields.includes(field)) {
        itemDetail[field] = item[field]
      } else {
        itemDetail[field] = ""
      }
    })

    setItemDetail(itemDetail)
    backupItemDetail.current = JSON.parse(JSON.stringify(item));
  }, [item])

  useEffect(() => {
    if (mobileCalledEditDetail > 0) {
      updateItemDetail();
    }
  }, [mobileCalledEditDetail])

  const updateInformation = (newValue: string, type: string, index: number) => {
    newValue = newValue
    if (type === "functionalities" || type === "points") {
      let updatedItem = { ...itemDetail }
      let list = updatedItem[type]
      list[index] = newValue
      updatedItem[type] = list
      setItemDetail(updatedItem)
    } else {
      let updatedItem = { ...itemDetail }
      updatedItem[type] = newValue
      setItemDetail(updatedItem)
    }
  }

  const removeSubItem = (index: number, field: string) => {
    let updatedItem = { ...itemDetail }
    let list = updatedItem[field]
    list.splice(index, 1)
    updatedItem[field] = list
    setItemDetail(updatedItem)
  }

  const addSubItem = (value: string, field: string) => {
    let updatedItem = { ...itemDetail }
    let list = updatedItem[field]
    list.push(value)
    updatedItem[field] = list
    setItemDetail(updatedItem)
  }

  const updateItemDetail = () => {
    let listOfFields = isPoint ? BASIC_FIELDS["point"] : BASIC_FIELDS["meridian"];
    let fields = listOfFields.map(item => {
      return item.field
    })

    let newItemDetail = {}

    Object.keys(itemDetail).forEach(field => {
      const index = fields.indexOf(field)
      if (listOfFields[index].critical) {
        newItemDetail[field] = itemDetail[field]
      } else {
        if (itemDetail[field] !== "") {
          newItemDetail[field] = itemDetail[field]
        }
      }
    })

    callbackUpdateDetail(newItemDetail)
  }

  return (
    <div
      role="div"
      aria-label="item-detail-edit"
      className={`item-detail-edit pt-2`}
    >
      <div
        className="item-detail-edit__header">
        <div className="item-detail-edit__flex-block grid grid-cols-2">
          <h1 className="item-detail-edit__header--code col-span-1">
            <input
              className='item-detail-edit__input'
              value={itemDetail?.code}
              placeholder={t(`placeholders.code`)}
              role="input"
              aria-label="input-code"
              disabled={true} />
          </h1>
          <h1 className="item-detail-edit__header--name col-span-1">
            <input
              className='item-detail-edit__input'
              value={itemDetail?.name}
              placeholder={t(`placeholders.name`)}
              onChange={(e) => updateInformation(e.target.value, "name", -1)}
              role="input"
              aria-label="input-name"
              style={{ textAlign: "right" }} />
          </h1>
        </div>
      </div>

      <div className="item-detail-edit__information">
        {Object.keys(itemDetail).map((field, index) => {
          if (field !== "name" && field !== "code") {
            return (
              <div key={`point-information-${index}`}>
                <div
                  className={`item-detail-edit__category ${field === "caution" ? "item-detail-edit__category--caution" : ""}`}>
                  <span>{capitalizeAndMapInformationField(isPoint, field, usingLanguage)}</span>
                </div>
                <div className="item-detail-edit__info">
                  {isPoint && field === "functionalities" ?
                    <>
                      <div className="pb-2 pt-1">
                        {(itemDetail[field] || []).map((functionality, itemIndex) =>
                        (
                          <p
                            key={`point-functionality-${itemIndex}`}
                          >
                            <span>
                              <span style={{ width: "25px", display: "inline-block" }}>{itemIndex + 1}.{' '}</span>
                              <input
                                className='item-detail-edit__input item-detail-edit__input--inline'
                                value={itemDetail?.functionalities?.[itemIndex]}
                                placeholder={t(`placeholders.functionality`)}
                                role="point-functionality"
                                aria-label={`point-functionality-${itemIndex}`}
                                onChange={(e) => updateInformation(e.target.value, "functionalities", itemIndex)} />
                              <FontAwesomeIcon
                                className="item-detail-edit__icon-delete"
                                icon={faTrashCan}
                                data-testid={`remove-icon-${itemIndex}`}
                                onClick={() => removeSubItem(itemIndex, field)}></FontAwesomeIcon>
                            </span>
                          </p>
                        ))}
                      </div>
                      <span className="mt-4">
                        <button
                          className='item-detail-edit__btn-add-subitem px-1'
                          role="button"
                          aria-label="button-add-subitem"
                          onClick={(e) => {
                            if (newItemValue.trim() !== "") {
                              addSubItem(newItemValue.trim(), field)
                              setNewItemValue("");
                            }
                          }}
                        >
                          +
                        </button>
                        <input
                          className='item-detail-edit__input item-detail-edit__input--inline ml-2'
                          value={newItemValue}
                          onChange={(e) => {
                            setNewItemValue(e.target.value);
                          }}
                          placeholder={t(`placeholders.add_new_functionality`)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              if (newItemValue.trim() !== "") {
                                addSubItem(newItemValue.trim(), field)
                                setNewItemValue("");
                              }
                            }
                          }}
                          role="input"
                          aria-label="input-add-subitem"
                          id="input-add-subitem"
                        />
                      </span>
                    </>
                    : <>
                      {
                        (!isPoint && field === "points") ?
                          <>
                            <div className="pb-2 pt-1">
                              {(itemDetail[field] || []).map((point, itemIndex) =>
                              (
                                <p
                                  key={`meridian-points-${itemIndex}`}
                                >
                                  <span>
                                    <span style={{ width: "25px", display: "inline-block" }}>{itemIndex + 1}.{' '}</span>
                                    <input
                                      className='item-detail-edit__input item-detail-edit__input--inline'
                                      value={itemDetail?.points?.[itemIndex]}
                                      role="meridian-point"
                                      aria-label={`meridian-point-${itemIndex}`}
                                      placeholder={t(`placeholders.point`)}
                                      onChange={(e) => updateInformation(e.target.value, "points", itemIndex)} />
                                    <FontAwesomeIcon
                                      className="item-detail-edit__icon-delete"
                                      icon={faTrashCan}
                                      data-testid={`remove-point-${itemIndex}`}
                                      onClick={() => removeSubItem(itemIndex, field)}></FontAwesomeIcon>
                                  </span>
                                </p>
                              ))}
                            </div>
                            <span className="mt-4">
                              <button
                                className='item-detail-edit__btn-add-subitem px-1'
                                role="button"
                                aria-label="button-add-point"
                                onClick={(e) => {
                                  if (newItemValue.trim() !== "") {
                                    addSubItem(newItemValue.trim(), field)
                                    setNewItemValue("");
                                  }
                                }}
                              >
                                +
                              </button>
                              <input
                                className='item-detail-edit__input item-detail-edit__input--inline ml-2'
                                value={newItemValue}
                                onChange={(e) => {
                                  setNewItemValue(e.target.value);
                                }}
                                placeholder={t(`placeholders.add_new_point`)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    if (newItemValue.trim() !== "") {
                                      addSubItem(newItemValue.trim(), field)
                                      setNewItemValue("");
                                    }
                                  }
                                }}
                                role="input"
                                aria-label="input-add-point"
                                id="input-add-point"
                              />
                            </span>
                          </>
                          :
                          <p className={`item-detail-edit__info--text pb-2 pt-1
                          ${field === "caution" ? "item-detail-edit__info--text-caution" : ""}`}>
                            <textarea
                              className='item-detail-edit__textarea'
                              rows={itemDetail[field].length < 200 ? 2 : itemDetail[field].length < 350 ? 3 : 4}
                              placeholder={t(`placeholders.${field}`)}
                              onChange={(e) => {
                                updateInformation(e.target.value, field, -1);
                              }}
                              role="textarea"
                              aria-label={`textarea-${field}`}
                              value={itemDetail[field]}>
                            </textarea>
                          </p>
                      }
                    </>
                  }
                </div>
              </div>
            )
          }
        })}
      </div>

      <p className='italic item-detail-edit__caution'>{t('edit_page.caution')}</p>

      {isDesktop && <div className='item-detail-edit__buttons flex items-center justify-center mt-3'>
        <div
          className='item-detail-edit__buttons--button item-detail-edit__buttons--button-check'
          role="div"
          aria-label="button-submit"
          onClick={() => updateItemDetail()}>
          <FontAwesomeIcon
            icon={faCheck}
          />
        </div>
        <div
          className='item-detail-edit__buttons--button item-detail-edit__buttons--button-multiply'
          role="div"
          aria-label="button-cancel"
          onClick={() => {
            resetItemDetail(backupItemDetail.current)
            history.push(location.pathname.replace("?edit", ""))
          }}>
          <FontAwesomeIcon
            icon={faMultiply}
          />
        </div>
      </div>}
    </div>
  );
};
