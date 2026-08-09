// gml_Object_freccia_tutorial_Step_2  locals=2 args=0 len=6444
// locals: arguments, __b__
00000000: push.imm.e 7
00000004: pushenv 0x209A510
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.imm.e 0
00000014: conv.i.v
00000018: push.v phase
00000020: call action_if_variable(argc=3)
00000028: pop.v.v local.__b__
00000030: push.local.v local.__b__
00000038: conv.v.b
0000003C: bf 0x209A510
00000040: b 0x209A518
00000044: popenv 0x409A4D4
00000048: b 0x209A51C
0000004C: popenv 0x1C9A518
00000050: push.local.v local.__b__
00000058: conv.v.b
0000005C: bf 0x209A554
00000060: push.imm.e -1000
00000064: conv.i.v
00000068: push.imm.e -1000
0000006C: conv.i.v
00000070: call action_move_to(argc=2)
00000078: popz
0000007C: push.imm.e 270
00000080: pop.v.i image_angle
00000088: push.imm.e 7
0000008C: pushenv 0x209A598
00000090: push.imm.e 0
00000094: conv.i.v
00000098: push.imm.e 1
0000009C: conv.i.v
000000A0: push.v phase
000000A8: call action_if_variable(argc=3)
000000B0: pop.v.v local.__b__
000000B8: push.local.v local.__b__
000000C0: conv.v.b
000000C4: bf 0x209A598
000000C8: b 0x209A5A0
000000CC: popenv 0x409A55C
000000D0: b 0x209A5A4
000000D4: popenv 0x1C9A5A0
000000D8: push.local.v local.__b__
000000E0: conv.v.b
000000E4: bf 0x209A5D0
000000E8: push.imm.e -1000
000000EC: conv.i.v
000000F0: push.imm.e -1000
000000F4: conv.i.v
000000F8: call action_move_to(argc=2)
00000100: popz
00000104: push.imm.e 7
00000108: pushenv 0x209A614
0000010C: push.imm.e 0
00000110: conv.i.v
00000114: push.imm.e 2
00000118: conv.i.v
0000011C: push.v phase
00000124: call action_if_variable(argc=3)
0000012C: pop.v.v local.__b__
00000134: push.local.v local.__b__
0000013C: conv.v.b
00000140: bf 0x209A614
00000144: b 0x209A61C
00000148: popenv 0x409A5D8
0000014C: b 0x209A620
00000150: popenv 0x1C9A61C
00000154: push.local.v local.__b__
0000015C: conv.v.b
00000160: bf 0x209A6A4
00000164: push.imm.e 270
00000168: pop.v.i image_angle
00000170: push.imm.e -1
00000174: push.imm.e 0
00000178: push.v obj0.view_hview[array]
00000180: push.imm.e -1
00000184: push.imm.e 0
00000188: push.v obj0.view_yview[array]
00000190: add.v.v
00000194: push.imm.e 100
00000198: push.global.v global.sca
000001A0: mul.v.i
000001A4: sub.v.v
000001A8: push.imm.e -1
000001AC: push.imm.e 0
000001B0: push.v obj0.view_xview[array]
000001B8: push.imm.e 344
000001BC: push.global.v global.sca
000001C4: mul.v.i
000001C8: add.v.v
000001CC: call action_move_to(argc=2)
000001D4: popz
000001D8: push.imm.e 7
000001DC: pushenv 0x209A6E8
000001E0: push.imm.e 0
000001E4: conv.i.v
000001E8: push.imm.e 3
000001EC: conv.i.v
000001F0: push.v phase
000001F8: call action_if_variable(argc=3)
00000200: pop.v.v local.__b__
00000208: push.local.v local.__b__
00000210: conv.v.b
00000214: bf 0x209A6E8
00000218: b 0x209A6F0
0000021C: popenv 0x409A6AC
00000220: b 0x209A6F4
00000224: popenv 0x1C9A6F0
00000228: push.local.v local.__b__
00000230: conv.v.b
00000234: bf 0x209A720
00000238: push.imm.e -1000
0000023C: conv.i.v
00000240: push.imm.e -1000
00000244: conv.i.v
00000248: call action_move_to(argc=2)
00000250: popz
00000254: push.imm.e 7
00000258: pushenv 0x209A764
0000025C: push.imm.e 0
00000260: conv.i.v
00000264: push.imm.e 4
00000268: conv.i.v
0000026C: push.v phase
00000274: call action_if_variable(argc=3)
0000027C: pop.v.v local.__b__
00000284: push.local.v local.__b__
0000028C: conv.v.b
00000290: bf 0x209A764
00000294: b 0x209A76C
00000298: popenv 0x409A728
0000029C: b 0x209A770
000002A0: popenv 0x1C9A76C
000002A4: push.local.v local.__b__
000002AC: conv.v.b
000002B0: bf 0x209A79C
000002B4: push.imm.e -1000
000002B8: conv.i.v
000002BC: push.imm.e -1000
000002C0: conv.i.v
000002C4: call action_move_to(argc=2)
000002CC: popz
000002D0: push.imm.e 7
000002D4: pushenv 0x209A7E0
000002D8: push.imm.e 0
000002DC: conv.i.v
000002E0: push.imm.e 5
000002E4: conv.i.v
000002E8: push.v phase
000002F0: call action_if_variable(argc=3)
000002F8: pop.v.v local.__b__
00000300: push.local.v local.__b__
00000308: conv.v.b
0000030C: bf 0x209A7E0
00000310: b 0x209A7E8
00000314: popenv 0x409A7A4
00000318: b 0x209A7EC
0000031C: popenv 0x1C9A7E8
00000320: push.local.v local.__b__
00000328: conv.v.b
0000032C: bf 0x209A878
00000330: push.imm.e 2
00000334: conv.i.v
00000338: push.imm.e 0
0000033C: conv.i.v
00000340: push.imm.e 267
00000344: conv.i.v
00000348: call action_if_number(argc=3)
00000350: pop.v.v local.__b__
00000358: push.local.v local.__b__
00000360: conv.v.b
00000364: bf 0x209A85C
00000368: push.v obj267.y
00000370: push.imm.e 100
00000374: sub.i.v
00000378: push.v obj267.x
00000380: call action_move_to(argc=2)
00000388: popz
0000038C: b 0x209A878
00000390: push.imm.e -1000
00000394: conv.i.v
00000398: push.imm.e -1000
0000039C: conv.i.v
000003A0: call action_move_to(argc=2)
000003A8: popz
000003AC: push.imm.e 7
000003B0: pushenv 0x209A8BC
000003B4: push.imm.e 0
000003B8: conv.i.v
000003BC: push.imm.e 6
000003C0: conv.i.v
000003C4: push.v phase
000003CC: call action_if_variable(argc=3)
000003D4: pop.v.v local.__b__
000003DC: push.local.v local.__b__
000003E4: conv.v.b
000003E8: bf 0x209A8BC
000003EC: b 0x209A8C4
000003F0: popenv 0x409A880
000003F4: b 0x209A8C8
000003F8: popenv 0x1C9A8C4
000003FC: push.local.v local.__b__
00000404: conv.v.b
00000408: bf 0x209A938
0000040C: push.imm.e 90
00000410: pop.v.i image_angle
00000418: push.imm.e -1
0000041C: push.imm.e 0
00000420: push.v obj0.view_yview[array]
00000428: push.imm.e 100
0000042C: push.global.v global.sca
00000434: mul.v.i
00000438: add.v.v
0000043C: push.imm.e -1
00000440: push.imm.e 0
00000444: push.v obj0.view_xview[array]
0000044C: push.imm.e 317
00000450: push.global.v global.sca
00000458: mul.v.i
0000045C: add.v.v
00000460: call action_move_to(argc=2)
00000468: popz
0000046C: push.imm.e 7
00000470: pushenv 0x209A97C
00000474: push.imm.e 0
00000478: conv.i.v
0000047C: push.imm.e 7
00000480: conv.i.v
00000484: push.v phase
0000048C: call action_if_variable(argc=3)
00000494: pop.v.v local.__b__
0000049C: push.local.v local.__b__
000004A4: conv.v.b
000004A8: bf 0x209A97C
000004AC: b 0x209A984
000004B0: popenv 0x409A940
000004B4: b 0x209A988
000004B8: popenv 0x1C9A984
000004BC: push.local.v local.__b__
000004C4: conv.v.b
000004C8: bf 0x209AA2C
000004CC: push.imm.e 0
000004D0: conv.i.v
000004D4: push.imm.e 270
000004D8: conv.i.v
000004DC: push.imm.e 1
000004E0: conv.i.v
000004E4: push.imm.e 1
000004E8: conv.i.v
000004EC: call action_sprite_transform(argc=4)
000004F4: popz
000004F8: push.imm.e 270
000004FC: pop.v.i image_angle
00000504: push.imm.e -1
00000508: push.imm.e 0
0000050C: push.v obj0.view_hview[array]
00000514: push.imm.e -1
00000518: push.imm.e 0
0000051C: push.v obj0.view_yview[array]
00000524: add.v.v
00000528: push.imm.e 120
0000052C: push.global.v global.sca
00000534: mul.v.i
00000538: sub.v.v
0000053C: push.imm.e -1
00000540: push.imm.e 0
00000544: push.v obj0.view_xview[array]
0000054C: push.imm.e 40
00000550: add.i.v
00000554: call action_move_to(argc=2)
0000055C: popz
00000560: push.imm.e 7
00000564: pushenv 0x209AA70
00000568: push.imm.e 0
0000056C: conv.i.v
00000570: push.imm.e 8
00000574: conv.i.v
00000578: push.v phase
00000580: call action_if_variable(argc=3)
00000588: pop.v.v local.__b__
00000590: push.local.v local.__b__
00000598: conv.v.b
0000059C: bf 0x209AA70
000005A0: b 0x209AA78
000005A4: popenv 0x409AA34
000005A8: b 0x209AA7C
000005AC: popenv 0x1C9AA78
000005B0: push.local.v local.__b__
000005B8: conv.v.b
000005BC: bf 0x209AC34
000005C0: push.imm.e 270
000005C4: pop.v.i image_angle
000005CC: push.imm.e 617
000005D0: pushenv 0x209AADC
000005D4: push.imm.e 0
000005D8: conv.i.v
000005DC: push.imm.e 0
000005E0: conv.i.v
000005E4: push.v menoo
000005EC: call action_if_variable(argc=3)
000005F4: pop.v.v local.__b__
000005FC: push.local.v local.__b__
00000604: conv.v.b
00000608: bf 0x209AADC
0000060C: b 0x209AAE4
00000610: popenv 0x409AAA0
00000614: b 0x209AAE8
00000618: popenv 0x1C9AAE4
0000061C: push.local.v local.__b__
00000624: conv.v.b
00000628: bf 0x209AB60
0000062C: push.imm.e -1
00000630: push.imm.e 0
00000634: push.v obj0.view_hview[array]
0000063C: push.imm.e -1
00000640: push.imm.e 0
00000644: push.v obj0.view_yview[array]
0000064C: add.v.v
00000650: push.imm.e 120
00000654: push.global.v global.sca
0000065C: mul.v.i
00000660: sub.v.v
00000664: push.imm.e -1
00000668: push.imm.e 0
0000066C: push.v obj0.view_xview[array]
00000674: push.imm.e 150
00000678: push.global.v global.sca
00000680: mul.v.i
00000684: add.v.v
00000688: call action_move_to(argc=2)
00000690: popz
00000694: push.imm.e 617
00000698: pushenv 0x209ABA4
0000069C: push.imm.e 0
000006A0: conv.i.v
000006A4: push.imm.e 1
000006A8: conv.i.v
000006AC: push.v menoo
000006B4: call action_if_variable(argc=3)
000006BC: pop.v.v local.__b__
000006C4: push.local.v local.__b__
000006CC: conv.v.b
000006D0: bf 0x209ABA4
000006D4: b 0x209ABAC
000006D8: popenv 0x409AB68
000006DC: b 0x209ABB0
000006E0: popenv 0x1C9ABAC
000006E4: push.local.v local.__b__
000006EC: conv.v.b
000006F0: bf 0x209AC34
000006F4: push.imm.e -1
000006F8: push.imm.e 0
000006FC: push.v obj0.view_hview[array]
00000704: push.imm.e -1
00000708: push.imm.e 0
0000070C: push.v obj0.view_yview[array]
00000714: add.v.v
00000718: push.imm.e 120
0000071C: push.global.v global.sca
00000724: mul.v.i
00000728: sub.v.v
0000072C: push.imm.e -1
00000730: push.imm.e 0
00000734: push.v obj0.view_xview[array]
0000073C: push.imm.e 42
00000740: push.global.v global.sca
00000748: mul.v.i
0000074C: add.v.v
00000750: push.v shifta
00000758: add.v.v
0000075C: call action_move_to(argc=2)
00000764: popz
00000768: push.imm.e 7
0000076C: pushenv 0x209AC78
00000770: push.imm.e 0
00000774: conv.i.v
00000778: push.imm.e 9
0000077C: conv.i.v
00000780: push.v phase
00000788: call action_if_variable(argc=3)
00000790: pop.v.v local.__b__
00000798: push.local.v local.__b__
000007A0: conv.v.b
000007A4: bf 0x209AC78
000007A8: b 0x209AC80
000007AC: popenv 0x409AC3C
000007B0: b 0x209AC84
000007B4: popenv 0x1C9AC80
000007B8: push.local.v local.__b__
000007C0: conv.v.b
000007C4: bf 0x209ACB0
000007C8: push.imm.e -1000
000007CC: conv.i.v
000007D0: push.imm.e -1000
000007D4: conv.i.v
000007D8: call action_move_to(argc=2)
000007E0: popz
000007E4: push.imm.e 7
000007E8: pushenv 0x209ACF4
000007EC: push.imm.e 0
000007F0: conv.i.v
000007F4: push.imm.e 10
000007F8: conv.i.v
000007FC: push.v phase
00000804: call action_if_variable(argc=3)
0000080C: pop.v.v local.__b__
00000814: push.local.v local.__b__
0000081C: conv.v.b
00000820: bf 0x209ACF4
00000824: b 0x209ACFC
00000828: popenv 0x409ACB8
0000082C: b 0x209AD00
00000830: popenv 0x1C9ACFC
00000834: push.local.v local.__b__
0000083C: conv.v.b
00000840: bf 0x209AD2C
00000844: push.imm.e -1000
00000848: conv.i.v
0000084C: push.imm.e -1000
00000850: conv.i.v
00000854: call action_move_to(argc=2)
0000085C: popz
00000860: push.imm.e 7
00000864: pushenv 0x209AD70
00000868: push.imm.e 0
0000086C: conv.i.v
00000870: push.imm.e 11
00000874: conv.i.v
00000878: push.v phase
00000880: call action_if_variable(argc=3)
00000888: pop.v.v local.__b__
00000890: push.local.v local.__b__
00000898: conv.v.b
0000089C: bf 0x209AD70
000008A0: b 0x209AD78
000008A4: popenv 0x409AD34
000008A8: b 0x209AD7C
000008AC: popenv 0x1C9AD78
000008B0: push.local.v local.__b__
000008B8: conv.v.b
000008BC: bf 0x209ADEC
000008C0: push.imm.e 90
000008C4: pop.v.i image_angle
000008CC: push.imm.e -1
000008D0: push.imm.e 0
000008D4: push.v obj0.view_yview[array]
000008DC: push.imm.e 100
000008E0: push.global.v global.sca
000008E8: mul.v.i
000008EC: add.v.v
000008F0: push.imm.e -1
000008F4: push.imm.e 0
000008F8: push.v obj0.view_xview[array]
00000900: push.imm.e 212
00000904: push.global.v global.sca
0000090C: mul.v.i
00000910: add.v.v
00000914: call action_move_to(argc=2)
0000091C: popz
00000920: push.imm.e 7
00000924: pushenv 0x209AE30
00000928: push.imm.e 0
0000092C: conv.i.v
00000930: push.imm.e 12
00000934: conv.i.v
00000938: push.v phase
00000940: call action_if_variable(argc=3)
00000948: pop.v.v local.__b__
00000950: push.local.v local.__b__
00000958: conv.v.b
0000095C: bf 0x209AE30
00000960: b 0x209AE38
00000964: popenv 0x409ADF4
00000968: b 0x209AE3C
0000096C: popenv 0x1C9AE38
00000970: push.local.v local.__b__
00000978: conv.v.b
0000097C: bf 0x209AFF4
00000980: push.imm.e 270
00000984: pop.v.i image_angle
0000098C: push.imm.e 617
00000990: pushenv 0x209AE9C
00000994: push.imm.e 0
00000998: conv.i.v
0000099C: push.imm.e 0
000009A0: conv.i.v
000009A4: push.v menoo
000009AC: call action_if_variable(argc=3)
000009B4: pop.v.v local.__b__
000009BC: push.local.v local.__b__
000009C4: conv.v.b
000009C8: bf 0x209AE9C
000009CC: b 0x209AEA4
000009D0: popenv 0x409AE60
000009D4: b 0x209AEA8
000009D8: popenv 0x1C9AEA4
000009DC: push.local.v local.__b__
000009E4: conv.v.b
000009E8: bf 0x209AF20
000009EC: push.imm.e -1
000009F0: push.imm.e 0
000009F4: push.v obj0.view_hview[array]
000009FC: push.imm.e -1
00000A00: push.imm.e 0
00000A04: push.v obj0.view_yview[array]
00000A0C: add.v.v
00000A10: push.imm.e 120
00000A14: push.global.v global.sca
00000A1C: mul.v.i
00000A20: sub.v.v
00000A24: push.imm.e -1
00000A28: push.imm.e 0
00000A2C: push.v obj0.view_xview[array]
00000A34: push.imm.e 150
00000A38: push.global.v global.sca
00000A40: mul.v.i
00000A44: add.v.v
00000A48: call action_move_to(argc=2)
00000A50: popz
00000A54: push.imm.e 617
00000A58: pushenv 0x209AF64
00000A5C: push.imm.e 0
00000A60: conv.i.v
00000A64: push.imm.e 1
00000A68: conv.i.v
00000A6C: push.v menoo
00000A74: call action_if_variable(argc=3)
00000A7C: pop.v.v local.__b__
00000A84: push.local.v local.__b__
00000A8C: conv.v.b
00000A90: bf 0x209AF64
00000A94: b 0x209AF6C
00000A98: popenv 0x409AF28
00000A9C: b 0x209AF70
00000AA0: popenv 0x1C9AF6C
00000AA4: push.local.v local.__b__
00000AAC: conv.v.b
00000AB0: bf 0x209AFF4
00000AB4: push.imm.e -1
00000AB8: push.imm.e 0
00000ABC: push.v obj0.view_hview[array]
00000AC4: push.imm.e -1
00000AC8: push.imm.e 0
00000ACC: push.v obj0.view_yview[array]
00000AD4: add.v.v
00000AD8: push.imm.e 120
00000ADC: push.global.v global.sca
00000AE4: mul.v.i
00000AE8: sub.v.v
00000AEC: push.imm.e -1
00000AF0: push.imm.e 0
00000AF4: push.v obj0.view_xview[array]
00000AFC: push.imm.e 222
00000B00: push.global.v global.sca
00000B08: mul.v.i
00000B0C: add.v.v
00000B10: push.v shifta
00000B18: add.v.v
00000B1C: call action_move_to(argc=2)
00000B24: popz
00000B28: push.imm.e 7
00000B2C: pushenv 0x209B038
00000B30: push.imm.e 0
00000B34: conv.i.v
00000B38: push.imm.e 13
00000B3C: conv.i.v
00000B40: push.v phase
00000B48: call action_if_variable(argc=3)
00000B50: pop.v.v local.__b__
00000B58: push.local.v local.__b__
00000B60: conv.v.b
00000B64: bf 0x209B038
00000B68: b 0x209B040
00000B6C: popenv 0x409AFFC
00000B70: b 0x209B044
00000B74: popenv 0x1C9B040
00000B78: push.local.v local.__b__
00000B80: conv.v.b
00000B84: bf 0x209B070
00000B88: push.imm.e -1000
00000B8C: conv.i.v
00000B90: push.imm.e -1000
00000B94: conv.i.v
00000B98: call action_move_to(argc=2)
00000BA0: popz
00000BA4: push.imm.e 7
00000BA8: pushenv 0x209B0B4
00000BAC: push.imm.e 0
00000BB0: conv.i.v
00000BB4: push.imm.e 14
00000BB8: conv.i.v
00000BBC: push.v phase
00000BC4: call action_if_variable(argc=3)
00000BCC: pop.v.v local.__b__
00000BD4: push.local.v local.__b__
00000BDC: conv.v.b
00000BE0: bf 0x209B0B4
00000BE4: b 0x209B0BC
00000BE8: popenv 0x409B078
00000BEC: b 0x209B0C0
00000BF0: popenv 0x1C9B0BC
00000BF4: push.local.v local.__b__
00000BFC: conv.v.b
00000C00: bf 0x209B0EC
00000C04: push.imm.e -1000
00000C08: conv.i.v
00000C0C: push.imm.e -1000
00000C10: conv.i.v
00000C14: call action_move_to(argc=2)
00000C1C: popz
00000C20: push.imm.e 7
00000C24: pushenv 0x209B130
00000C28: push.imm.e 0
00000C2C: conv.i.v
00000C30: push.imm.e 15
00000C34: conv.i.v
00000C38: push.v phase
00000C40: call action_if_variable(argc=3)
00000C48: pop.v.v local.__b__
00000C50: push.local.v local.__b__
00000C58: conv.v.b
00000C5C: bf 0x209B130
00000C60: b 0x209B138
00000C64: popenv 0x409B0F4
00000C68: b 0x209B13C
00000C6C: popenv 0x1C9B138
00000C70: push.local.v local.__b__
00000C78: conv.v.b
00000C7C: bf 0x209B168
00000C80: push.imm.e -1000
00000C84: conv.i.v
00000C88: push.imm.e -1000
00000C8C: conv.i.v
00000C90: call action_move_to(argc=2)
00000C98: popz
00000C9C: push.imm.e 7
00000CA0: pushenv 0x209B1AC
00000CA4: push.imm.e 0
00000CA8: conv.i.v
00000CAC: push.imm.e 16
00000CB0: conv.i.v
00000CB4: push.v phase
00000CBC: call action_if_variable(argc=3)
00000CC4: pop.v.v local.__b__
00000CCC: push.local.v local.__b__
00000CD4: conv.v.b
00000CD8: bf 0x209B1AC
00000CDC: b 0x209B1B4
00000CE0: popenv 0x409B170
00000CE4: b 0x209B1B8
00000CE8: popenv 0x1C9B1B4
00000CEC: push.local.v local.__b__
00000CF4: conv.v.b
00000CF8: bf 0x209B370
00000CFC: push.imm.e 270
00000D00: pop.v.i image_angle
00000D08: push.imm.e 617
00000D0C: pushenv 0x209B218
00000D10: push.imm.e 0
00000D14: conv.i.v
00000D18: push.imm.e 0
00000D1C: conv.i.v
00000D20: push.v menoo
00000D28: call action_if_variable(argc=3)
00000D30: pop.v.v local.__b__
00000D38: push.local.v local.__b__
00000D40: conv.v.b
00000D44: bf 0x209B218
00000D48: b 0x209B220
00000D4C: popenv 0x409B1DC
00000D50: b 0x209B224
00000D54: popenv 0x1C9B220
00000D58: push.local.v local.__b__
00000D60: conv.v.b
00000D64: bf 0x209B29C
00000D68: push.imm.e -1
00000D6C: push.imm.e 0
00000D70: push.v obj0.view_hview[array]
00000D78: push.imm.e -1
00000D7C: push.imm.e 0
00000D80: push.v obj0.view_yview[array]
00000D88: add.v.v
00000D8C: push.imm.e 120
00000D90: push.global.v global.sca
00000D98: mul.v.i
00000D9C: sub.v.v
00000DA0: push.imm.e -1
00000DA4: push.imm.e 0
00000DA8: push.v obj0.view_xview[array]
00000DB0: push.imm.e 150
00000DB4: push.global.v global.sca
00000DBC: mul.v.i
00000DC0: add.v.v
00000DC4: call action_move_to(argc=2)
00000DCC: popz
00000DD0: push.imm.e 617
00000DD4: pushenv 0x209B2E0
00000DD8: push.imm.e 0
00000DDC: conv.i.v
00000DE0: push.imm.e 1
00000DE4: conv.i.v
00000DE8: push.v menoo
00000DF0: call action_if_variable(argc=3)
00000DF8: pop.v.v local.__b__
00000E00: push.local.v local.__b__
00000E08: conv.v.b
00000E0C: bf 0x209B2E0
00000E10: b 0x209B2E8
00000E14: popenv 0x409B2A4
00000E18: b 0x209B2EC
00000E1C: popenv 0x1C9B2E8
00000E20: push.local.v local.__b__
00000E28: conv.v.b
00000E2C: bf 0x209B370
00000E30: push.imm.e -1
00000E34: push.imm.e 0
00000E38: push.v obj0.view_hview[array]
00000E40: push.imm.e -1
00000E44: push.imm.e 0
00000E48: push.v obj0.view_yview[array]
00000E50: add.v.v
00000E54: push.imm.e 120
00000E58: push.global.v global.sca
00000E60: mul.v.i
00000E64: sub.v.v
00000E68: push.imm.e -1
00000E6C: push.imm.e 0
00000E70: push.v obj0.view_xview[array]
00000E78: push.imm.e 150
00000E7C: push.global.v global.sca
00000E84: mul.v.i
00000E88: add.v.v
00000E8C: push.v shifta
00000E94: add.v.v
00000E98: call action_move_to(argc=2)
00000EA0: popz
00000EA4: push.imm.e 7
00000EA8: pushenv 0x209B3B4
00000EAC: push.imm.e 0
00000EB0: conv.i.v
00000EB4: push.imm.e 17
00000EB8: conv.i.v
00000EBC: push.v phase
00000EC4: call action_if_variable(argc=3)
00000ECC: pop.v.v local.__b__
00000ED4: push.local.v local.__b__
00000EDC: conv.v.b
00000EE0: bf 0x209B3B4
00000EE4: b 0x209B3BC
00000EE8: popenv 0x409B378
00000EEC: b 0x209B3C0
00000EF0: popenv 0x1C9B3BC
00000EF4: push.local.v local.__b__
00000EFC: conv.v.b
00000F00: bf 0x209B3EC
00000F04: push.imm.e -1000
00000F08: conv.i.v
00000F0C: push.imm.e -1000
00000F10: conv.i.v
00000F14: call action_move_to(argc=2)
00000F1C: popz
00000F20: push.imm.e 7
00000F24: pushenv 0x209B430
00000F28: push.imm.e 0
00000F2C: conv.i.v
00000F30: push.imm.e 18
00000F34: conv.i.v
00000F38: push.v phase
00000F40: call action_if_variable(argc=3)
00000F48: pop.v.v local.__b__
00000F50: push.local.v local.__b__
00000F58: conv.v.b
00000F5C: bf 0x209B430
00000F60: b 0x209B438
00000F64: popenv 0x409B3F4
00000F68: b 0x209B43C
00000F6C: popenv 0x1C9B438
00000F70: push.local.v local.__b__
00000F78: conv.v.b
00000F7C: bf 0x209B468
00000F80: push.imm.e -1000
00000F84: conv.i.v
00000F88: push.imm.e -1000
00000F8C: conv.i.v
00000F90: call action_move_to(argc=2)
00000F98: popz
00000F9C: push.imm.e 7
00000FA0: pushenv 0x209B4AC
00000FA4: push.imm.e 0
00000FA8: conv.i.v
00000FAC: push.imm.e 19
00000FB0: conv.i.v
00000FB4: push.v phase
00000FBC: call action_if_variable(argc=3)
00000FC4: pop.v.v local.__b__
00000FCC: push.local.v local.__b__
00000FD4: conv.v.b
00000FD8: bf 0x209B4AC
00000FDC: b 0x209B4B4
00000FE0: popenv 0x409B470
00000FE4: b 0x209B4B8
00000FE8: popenv 0x1C9B4B4
00000FEC: push.local.v local.__b__
00000FF4: conv.v.b
00000FF8: bf 0x209B670
00000FFC: push.imm.e 270
00001000: pop.v.i image_angle
00001008: push.imm.e 617
0000100C: pushenv 0x209B518
00001010: push.imm.e 0
00001014: conv.i.v
00001018: push.imm.e 0
0000101C: conv.i.v
00001020: push.v menoo
00001028: call action_if_variable(argc=3)
00001030: pop.v.v local.__b__
00001038: push.local.v local.__b__
00001040: conv.v.b
00001044: bf 0x209B518
00001048: b 0x209B520
0000104C: popenv 0x409B4DC
00001050: b 0x209B524
00001054: popenv 0x1C9B520
00001058: push.local.v local.__b__
00001060: conv.v.b
00001064: bf 0x209B59C
00001068: push.imm.e -1
0000106C: push.imm.e 0
00001070: push.v obj0.view_hview[array]
00001078: push.imm.e -1
0000107C: push.imm.e 0
00001080: push.v obj0.view_yview[array]
00001088: add.v.v
0000108C: push.imm.e 120
00001090: push.global.v global.sca
00001098: mul.v.i
0000109C: sub.v.v
000010A0: push.imm.e -1
000010A4: push.imm.e 0
000010A8: push.v obj0.view_xview[array]
000010B0: push.imm.e 150
000010B4: push.global.v global.sca
000010BC: mul.v.i
000010C0: add.v.v
000010C4: call action_move_to(argc=2)
000010CC: popz
000010D0: push.imm.e 617
000010D4: pushenv 0x209B5E0
000010D8: push.imm.e 0
000010DC: conv.i.v
000010E0: push.imm.e 1
000010E4: conv.i.v
000010E8: push.v menoo
000010F0: call action_if_variable(argc=3)
000010F8: pop.v.v local.__b__
00001100: push.local.v local.__b__
00001108: conv.v.b
0000110C: bf 0x209B5E0
00001110: b 0x209B5E8
00001114: popenv 0x409B5A4
00001118: b 0x209B5EC
0000111C: popenv 0x1C9B5E8
00001120: push.local.v local.__b__
00001128: conv.v.b
0000112C: bf 0x209B670
00001130: push.imm.e -1
00001134: push.imm.e 0
00001138: push.v obj0.view_hview[array]
00001140: push.imm.e -1
00001144: push.imm.e 0
00001148: push.v obj0.view_yview[array]
00001150: add.v.v
00001154: push.imm.e 120
00001158: push.global.v global.sca
00001160: mul.v.i
00001164: sub.v.v
00001168: push.imm.e -1
0000116C: push.imm.e 0
00001170: push.v obj0.view_xview[array]
00001178: push.imm.e 342
0000117C: push.global.v global.sca
00001184: mul.v.i
00001188: add.v.v
0000118C: push.v shifta
00001194: add.v.v
00001198: call action_move_to(argc=2)
000011A0: popz
000011A4: push.imm.e 7
000011A8: pushenv 0x209B6B4
000011AC: push.imm.e 0
000011B0: conv.i.v
000011B4: push.imm.e 20
000011B8: conv.i.v
000011BC: push.v phase
000011C4: call action_if_variable(argc=3)
000011CC: pop.v.v local.__b__
000011D4: push.local.v local.__b__
000011DC: conv.v.b
000011E0: bf 0x209B6B4
000011E4: b 0x209B6BC
000011E8: popenv 0x409B678
000011EC: b 0x209B6C0
000011F0: popenv 0x1C9B6BC
000011F4: push.local.v local.__b__
000011FC: conv.v.b
00001200: bf 0x209B6EC
00001204: push.imm.e -1000
00001208: conv.i.v
0000120C: push.imm.e -1000
00001210: conv.i.v
00001214: call action_move_to(argc=2)
0000121C: popz
00001220: push.imm.e 7
00001224: pushenv 0x209B730
00001228: push.imm.e 0
0000122C: conv.i.v
00001230: push.imm.e 21
00001234: conv.i.v
00001238: push.v phase
00001240: call action_if_variable(argc=3)
00001248: pop.v.v local.__b__
00001250: push.local.v local.__b__
00001258: conv.v.b
0000125C: bf 0x209B730
00001260: b 0x209B738
00001264: popenv 0x409B6F4
00001268: b 0x209B73C
0000126C: popenv 0x1C9B738
00001270: push.local.v local.__b__
00001278: conv.v.b
0000127C: bf 0x209B768
00001280: push.imm.e -1000
00001284: conv.i.v
00001288: push.imm.e -1000
0000128C: conv.i.v
00001290: call action_move_to(argc=2)
00001298: popz
0000129C: push.imm.e 7
000012A0: pushenv 0x209B7AC
000012A4: push.imm.e 0
000012A8: conv.i.v
000012AC: push.imm.e 22
000012B0: conv.i.v
000012B4: push.v phase
000012BC: call action_if_variable(argc=3)
000012C4: pop.v.v local.__b__
000012CC: push.local.v local.__b__
000012D4: conv.v.b
000012D8: bf 0x209B7AC
000012DC: b 0x209B7B4
000012E0: popenv 0x409B770
000012E4: b 0x209B7B8
000012E8: popenv 0x1C9B7B4
000012EC: push.local.v local.__b__
000012F4: conv.v.b
000012F8: bf 0x209B7E4
000012FC: push.imm.e -1000
00001300: conv.i.v
00001304: push.imm.e -1000
00001308: conv.i.v
0000130C: call action_move_to(argc=2)
00001314: popz
00001318: push.imm.e 7
0000131C: pushenv 0x209B828
00001320: push.imm.e 0
00001324: conv.i.v
00001328: push.imm.e 23
0000132C: conv.i.v
00001330: push.v phase
00001338: call action_if_variable(argc=3)
00001340: pop.v.v local.__b__
00001348: push.local.v local.__b__
00001350: conv.v.b
00001354: bf 0x209B828
00001358: b 0x209B830
0000135C: popenv 0x409B7EC
00001360: b 0x209B834
00001364: popenv 0x1C9B830
00001368: push.local.v local.__b__
00001370: conv.v.b
00001374: bf 0x209B860
00001378: push.imm.e -1000
0000137C: conv.i.v
00001380: push.imm.e -1000
00001384: conv.i.v
00001388: call action_move_to(argc=2)
00001390: popz
00001394: push.imm.e 7
00001398: pushenv 0x209B8A4
0000139C: push.imm.e 0
000013A0: conv.i.v
000013A4: push.imm.e 24
000013A8: conv.i.v
000013AC: push.v phase
000013B4: call action_if_variable(argc=3)
000013BC: pop.v.v local.__b__
000013C4: push.local.v local.__b__
000013CC: conv.v.b
000013D0: bf 0x209B8A4
000013D4: b 0x209B8AC
000013D8: popenv 0x409B868
000013DC: b 0x209B8B0
000013E0: popenv 0x1C9B8AC
000013E4: push.local.v local.__b__
000013EC: conv.v.b
000013F0: bf 0x209B920
000013F4: push.imm.e 90
000013F8: pop.v.i image_angle
00001400: push.imm.e -1
00001404: push.imm.e 0
00001408: push.v obj0.view_yview[array]
00001410: push.imm.e 100
00001414: push.global.v global.sca
0000141C: mul.v.i
00001420: sub.v.v
00001424: push.imm.e -1
00001428: push.imm.e 0
0000142C: push.v obj0.view_xview[array]
00001434: push.imm.e 111
00001438: push.global.v global.sca
00001440: mul.v.i
00001444: add.v.v
00001448: call action_move_to(argc=2)
00001450: popz
00001454: push.imm.e 7
00001458: pushenv 0x209B964
0000145C: push.imm.e 0
00001460: conv.i.v
00001464: push.imm.e 25
00001468: conv.i.v
0000146C: push.v phase
00001474: call action_if_variable(argc=3)
0000147C: pop.v.v local.__b__
00001484: push.local.v local.__b__
0000148C: conv.v.b
00001490: bf 0x209B964
00001494: b 0x209B96C
00001498: popenv 0x409B928
0000149C: b 0x209B970
000014A0: popenv 0x1C9B96C
000014A4: push.local.v local.__b__
000014AC: conv.v.b
000014B0: bf 0x209B99C
000014B4: push.imm.e -1000
000014B8: conv.i.v
000014BC: push.imm.e -1000
000014C0: conv.i.v
000014C4: call action_move_to(argc=2)
000014CC: popz
000014D0: push.imm.e 7
000014D4: pushenv 0x209B9E0
000014D8: push.imm.e 0
000014DC: conv.i.v
000014E0: push.imm.e 26
000014E4: conv.i.v
000014E8: push.v phase
000014F0: call action_if_variable(argc=3)
000014F8: pop.v.v local.__b__
00001500: push.local.v local.__b__
00001508: conv.v.b
0000150C: bf 0x209B9E0
00001510: b 0x209B9E8
00001514: popenv 0x409B9A4
00001518: b 0x209B9EC
0000151C: popenv 0x1C9B9E8
00001520: push.local.v local.__b__
00001528: conv.v.b
0000152C: bf 0x209BA18
00001530: push.imm.e -1000
00001534: conv.i.v
00001538: push.imm.e -1000
0000153C: conv.i.v
00001540: call action_move_to(argc=2)
00001548: popz
0000154C: push.imm.e 7
00001550: pushenv 0x209BA5C
00001554: push.imm.e 0
00001558: conv.i.v
0000155C: push.imm.e 27
00001560: conv.i.v
00001564: push.v phase
0000156C: call action_if_variable(argc=3)
00001574: pop.v.v local.__b__
0000157C: push.local.v local.__b__
00001584: conv.v.b
00001588: bf 0x209BA5C
0000158C: b 0x209BA64
00001590: popenv 0x409BA20
00001594: b 0x209BA68
00001598: popenv 0x1C9BA64
0000159C: push.local.v local.__b__
000015A4: conv.v.b
000015A8: bf 0x209BA94
000015AC: push.imm.e -1000
000015B0: conv.i.v
000015B4: push.imm.e -1000
000015B8: conv.i.v
000015BC: call action_move_to(argc=2)
000015C4: popz
000015C8: push.imm.e 7
000015CC: pushenv 0x209BAD8
000015D0: push.imm.e 0
000015D4: conv.i.v
000015D8: push.imm.e 28
000015DC: conv.i.v
000015E0: push.v phase
000015E8: call action_if_variable(argc=3)
000015F0: pop.v.v local.__b__
000015F8: push.local.v local.__b__
00001600: conv.v.b
00001604: bf 0x209BAD8
00001608: b 0x209BAE0
0000160C: popenv 0x409BA9C
00001610: b 0x209BAE4
00001614: popenv 0x1C9BAE0
00001618: push.local.v local.__b__
00001620: conv.v.b
00001624: bf 0x209BB10
00001628: push.imm.e -1000
0000162C: conv.i.v
00001630: push.imm.e -1000
00001634: conv.i.v
00001638: call action_move_to(argc=2)
00001640: popz
00001644: push.imm.e 7
00001648: pushenv 0x209BB54
0000164C: push.imm.e 0
00001650: conv.i.v
00001654: push.imm.e 29
00001658: conv.i.v
0000165C: push.v phase
00001664: call action_if_variable(argc=3)
0000166C: pop.v.v local.__b__
00001674: push.local.v local.__b__
0000167C: conv.v.b
00001680: bf 0x209BB54
00001684: b 0x209BB5C
00001688: popenv 0x409BB18
0000168C: b 0x209BB60
00001690: popenv 0x1C9BB5C
00001694: push.local.v local.__b__
0000169C: conv.v.b
000016A0: bf 0x209BB8C
000016A4: push.imm.e -1000
000016A8: conv.i.v
000016AC: push.imm.e -1000
000016B0: conv.i.v
000016B4: call action_move_to(argc=2)
000016BC: popz
000016C0: push.imm.e 7
000016C4: pushenv 0x209BBD0
000016C8: push.imm.e 0
000016CC: conv.i.v
000016D0: push.imm.e 30
000016D4: conv.i.v
000016D8: push.v phase
000016E0: call action_if_variable(argc=3)
000016E8: pop.v.v local.__b__
000016F0: push.local.v local.__b__
000016F8: conv.v.b
000016FC: bf 0x209BBD0
00001700: b 0x209BBD8
00001704: popenv 0x409BB94
00001708: b 0x209BBDC
0000170C: popenv 0x1C9BBD8
00001710: push.local.v local.__b__
00001718: conv.v.b
0000171C: bf 0x209BC08
00001720: push.imm.e -1000
00001724: conv.i.v
00001728: push.imm.e -1000
0000172C: conv.i.v
00001730: call action_move_to(argc=2)
00001738: popz
0000173C: push.imm.e 7
00001740: pushenv 0x209BC4C
00001744: push.imm.e 0
00001748: conv.i.v
0000174C: push.imm.e 31
00001750: conv.i.v
00001754: push.v phase
0000175C: call action_if_variable(argc=3)
00001764: pop.v.v local.__b__
0000176C: push.local.v local.__b__
00001774: conv.v.b
00001778: bf 0x209BC4C
0000177C: b 0x209BC54
00001780: popenv 0x409BC10
00001784: b 0x209BC58
00001788: popenv 0x1C9BC54
0000178C: push.local.v local.__b__
00001794: conv.v.b
00001798: bf 0x209BD5C
0000179C: push.imm.e 270
000017A0: pop.v.i image_angle
000017A8: push.imm.e 617
000017AC: pushenv 0x209BCB8
000017B0: push.imm.e 0
000017B4: conv.i.v
000017B8: push.imm.e 0
000017BC: conv.i.v
000017C0: push.v menoo
000017C8: call action_if_variable(argc=3)
000017D0: pop.v.v local.__b__
000017D8: push.local.v local.__b__
000017E0: conv.v.b
000017E4: bf 0x209BCB8
000017E8: b 0x209BCC0
000017EC: popenv 0x409BC7C
000017F0: b 0x209BCC4
000017F4: popenv 0x1C9BCC0
000017F8: push.local.v local.__b__
00001800: conv.v.b
00001804: bf 0x209BD40
00001808: push.imm.e -1
0000180C: push.imm.e 0
00001810: push.v obj0.view_hview[array]
00001818: push.imm.e -1
0000181C: push.imm.e 0
00001820: push.v obj0.view_yview[array]
00001828: add.v.v
0000182C: push.imm.e 100
00001830: push.global.v global.sca
00001838: mul.v.i
0000183C: sub.v.v
00001840: push.imm.e -1
00001844: push.imm.e 0
00001848: push.v obj0.view_xview[array]
00001850: push.imm.e 238
00001854: push.global.v global.sca
0000185C: mul.v.i
00001860: add.v.v
00001864: call action_move_to(argc=2)
0000186C: popz
00001870: b 0x209BD5C
00001874: push.imm.e -1000
00001878: conv.i.v
0000187C: push.imm.e -1000
00001880: conv.i.v
00001884: call action_move_to(argc=2)
0000188C: popz
00001890: push.imm.e 7
00001894: pushenv 0x209BDA0
00001898: push.imm.e 0
0000189C: conv.i.v
000018A0: push.imm.e 32
000018A4: conv.i.v
000018A8: push.v phase
000018B0: call action_if_variable(argc=3)
000018B8: pop.v.v local.__b__
000018C0: push.local.v local.__b__
000018C8: conv.v.b
000018CC: bf 0x209BDA0
000018D0: b 0x209BDA8
000018D4: popenv 0x409BD64
000018D8: b 0x209BDAC
000018DC: popenv 0x1C9BDA8
000018E0: push.local.v local.__b__
000018E8: conv.v.b
000018EC: bf 0x209BDD8
000018F0: push.imm.e -1000
000018F4: conv.i.v
000018F8: push.imm.e -1000
000018FC: conv.i.v
00001900: call action_move_to(argc=2)
00001908: popz
0000190C: push.global.v global.sca
00001914: pop.v.v image_xscale
0000191C: push.global.v global.sca
00001924: pop.v.v image_yscale