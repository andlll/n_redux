// gml_Object_lasergun_Mouse_4  locals=2 args=0 len=2620
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 0
00000018: conv.i.v
0000001C: push.imm.e 0
00000020: conv.i.v
00000024: push.v ovr
0000002C: call action_if_variable(argc=3)
00000034: pop.v.v local.__b__
0000003C: push.local.v local.__b__
00000044: conv.v.b
00000048: bf 0x20F52D4
0000004C: push.imm.e 1
00000050: conv.i.v
00000054: push.imm.e 800
00000058: conv.i.v
0000005C: push.imm.e 15
00000060: conv.i.v
00000064: call distance_to_object(argc=1)
0000006C: call action_if_variable(argc=3)
00000074: pop.v.v local.__b__
0000007C: push.local.v local.__b__
00000084: conv.v.b
00000088: bf 0x20F52D4
0000008C: push.imm.e 0
00000090: conv.i.v
00000094: push.imm.e 0
00000098: conv.i.v
0000009C: push.v launching
000000A4: call action_if_variable(argc=3)
000000AC: pop.v.v local.__b__
000000B4: push.local.v local.__b__
000000BC: conv.v.b
000000C0: bf 0x20F52D4
000000C4: push.imm.e 156
000000C8: pushenv 0x20F4B24
000000CC: push.imm.e 2
000000D0: conv.i.v
000000D4: push.imm.e 200
000000D8: conv.i.v
000000DC: push.v ele
000000E4: call action_if_variable(argc=3)
000000EC: pop.v.v local.__b__
000000F4: push.local.v local.__b__
000000FC: conv.v.b
00000100: bf 0x20F4B24
00000104: b 0x20F4B2C
00000108: popenv 0x40F4AE8
0000010C: b 0x20F4B30
00000110: popenv 0x1CF4B2C
00000114: push.local.v local.__b__
0000011C: conv.v.b
00000120: bf 0x20F52D4
00000124: push.imm.e 156
00000128: pushenv 0x20F4B54
0000012C: push.imm.e 0
00000130: pop.v.i selec
00000138: popenv 0x40F4B48
0000013C: push.imm.e 156
00000140: pushenv 0x20F4BA0
00000144: push.imm.e 1
00000148: conv.i.v
0000014C: call action_set_relative(argc=1)
00000154: popz
00000158: push.v ele
00000160: push.imm.e -200
00000164: add.i.v
00000168: pop.v.v ele
00000170: push.imm.e 0
00000174: conv.i.v
00000178: call action_set_relative(argc=1)
00000180: popz
00000184: popenv 0x40F4B60
00000188: push.imm.e 1
0000018C: pop.v.i islas
00000194: push.imm.e 1
00000198: pop.v.i launching
000001A0: push.imm.e 2
000001A4: conv.i.v
000001A8: push.imm.e 40
000001AC: conv.i.v
000001B0: call action_set_alarm(argc=2)
000001B8: popz
000001BC: push.imm.e 2
000001C0: pop.v.i launching
000001C8: push.imm.e 1
000001CC: conv.i.v
000001D0: push.imm.e 85
000001D4: conv.i.v
000001D8: call action_set_alarm(argc=2)
000001E0: popz
000001E4: push.imm.e 15
000001E8: conv.i.v
000001EC: push.v y
000001F4: push.v x
000001FC: call instance_nearest(argc=3)
00000204: conv.v.i
00000208: push.v [stacktop].y
00000210: push.imm.e 15
00000214: conv.i.v
00000218: push.v y
00000220: push.v x
00000228: call instance_nearest(argc=3)
00000230: conv.v.i
00000234: push.v [stacktop].x
0000023C: push.v y
00000244: push.v x
0000024C: call point_direction(argc=4)
00000254: pop.v.v direttorio
0000025C: push.v direttorio
00000264: push.d 22.5
00000270: cmp.d.v <=
00000274: bf 0x20F4CC8
00000278: push.imm.e 287
0000027C: conv.i.v
00000280: push.v y
00000288: push.imm.e 321
0000028C: sub.i.v
00000290: push.v x
00000298: push.imm.e 81
0000029C: add.i.v
000002A0: call instance_create(argc=3)
000002A8: popz
000002AC: push.v direttorio
000002B4: push.d 22.5
000002C0: cmp.d.v >
000002C4: bf 0x20F4D2C
000002C8: push.v direttorio
000002D0: push.imm.e 45
000002D4: cmp.i.v <=
000002D8: bf 0x20F4D2C
000002DC: push.imm.e 288
000002E0: conv.i.v
000002E4: push.v y
000002EC: push.imm.e 335
000002F0: sub.i.v
000002F4: push.v x
000002FC: push.imm.e 65
00000300: add.i.v
00000304: call instance_create(argc=3)
0000030C: popz
00000310: push.v direttorio
00000318: push.imm.e 45
0000031C: cmp.i.v >
00000320: bf 0x20F4D90
00000324: push.v direttorio
0000032C: push.d 67.5
00000338: cmp.d.v <=
0000033C: bf 0x20F4D90
00000340: push.imm.e 288
00000344: conv.i.v
00000348: push.v y
00000350: push.imm.e 344
00000354: sub.i.v
00000358: push.v x
00000360: push.imm.e 38
00000364: add.i.v
00000368: call instance_create(argc=3)
00000370: popz
00000374: push.v direttorio
0000037C: push.d 67.5
00000388: cmp.d.v >
0000038C: bf 0x20F4DF4
00000390: push.v direttorio
00000398: push.imm.e 90
0000039C: cmp.i.v <=
000003A0: bf 0x20F4DF4
000003A4: push.imm.e 288
000003A8: conv.i.v
000003AC: push.v y
000003B4: push.imm.e 354
000003B8: sub.i.v
000003BC: push.v x
000003C4: push.imm.e 9
000003C8: add.i.v
000003CC: call instance_create(argc=3)
000003D4: popz
000003D8: push.v direttorio
000003E0: push.imm.e 90
000003E4: cmp.i.v >
000003E8: bf 0x20F4E58
000003EC: push.v direttorio
000003F4: push.d 112.5
00000400: cmp.d.v <=
00000404: bf 0x20F4E58
00000408: push.imm.e 288
0000040C: conv.i.v
00000410: push.v y
00000418: push.imm.e 355
0000041C: sub.i.v
00000420: push.v x
00000428: push.imm.e 23
0000042C: sub.i.v
00000430: call instance_create(argc=3)
00000438: popz
0000043C: push.v direttorio
00000444: push.d 112.5
00000450: cmp.d.v >
00000454: bf 0x20F4EBC
00000458: push.v direttorio
00000460: push.imm.e 135
00000464: cmp.i.v <=
00000468: bf 0x20F4EBC
0000046C: push.imm.e 288
00000470: conv.i.v
00000474: push.v y
0000047C: push.imm.e 343
00000480: sub.i.v
00000484: push.v x
0000048C: push.imm.e 49
00000490: sub.i.v
00000494: call instance_create(argc=3)
0000049C: popz
000004A0: push.v direttorio
000004A8: push.imm.e 135
000004AC: cmp.i.v >
000004B0: bf 0x20F4F20
000004B4: push.v direttorio
000004BC: push.d 157.5
000004C8: cmp.d.v <=
000004CC: bf 0x20F4F20
000004D0: push.imm.e 288
000004D4: conv.i.v
000004D8: push.v y
000004E0: push.imm.e 331
000004E4: sub.i.v
000004E8: push.v x
000004F0: push.imm.e 70
000004F4: sub.i.v
000004F8: call instance_create(argc=3)
00000500: popz
00000504: push.v direttorio
0000050C: push.d 157.5
00000518: cmp.d.v >
0000051C: bf 0x20F4F84
00000520: push.v direttorio
00000528: push.imm.e 180
0000052C: cmp.i.v <=
00000530: bf 0x20F4F84
00000534: push.imm.e 288
00000538: conv.i.v
0000053C: push.v y
00000544: push.imm.e 315
00000548: sub.i.v
0000054C: push.v x
00000554: push.imm.e 80
00000558: sub.i.v
0000055C: call instance_create(argc=3)
00000564: popz
00000568: push.v direttorio
00000570: push.imm.e 180
00000574: cmp.i.v >
00000578: bf 0x20F4FE8
0000057C: push.v direttorio
00000584: push.d 202.5
00000590: cmp.d.v <=
00000594: bf 0x20F4FE8
00000598: push.imm.e 287
0000059C: conv.i.v
000005A0: push.v y
000005A8: push.imm.e 298
000005AC: sub.i.v
000005B0: push.v x
000005B8: push.imm.e 77
000005BC: sub.i.v
000005C0: call instance_create(argc=3)
000005C8: popz
000005CC: push.v direttorio
000005D4: push.d 202.5
000005E0: cmp.d.v >
000005E4: bf 0x20F504C
000005E8: push.v direttorio
000005F0: push.imm.e 225
000005F4: cmp.i.v <=
000005F8: bf 0x20F504C
000005FC: push.imm.e 287
00000600: conv.i.v
00000604: push.v y
0000060C: push.imm.e 283
00000610: sub.i.v
00000614: push.v x
0000061C: push.imm.e 65
00000620: sub.i.v
00000624: call instance_create(argc=3)
0000062C: popz
00000630: push.v direttorio
00000638: push.imm.e 225
0000063C: cmp.i.v >
00000640: bf 0x20F50B0
00000644: push.v direttorio
0000064C: push.d 247.5
00000658: cmp.d.v <=
0000065C: bf 0x20F50B0
00000660: push.imm.e 287
00000664: conv.i.v
00000668: push.v y
00000670: push.imm.e 268
00000674: sub.i.v
00000678: push.v x
00000680: push.imm.e 42
00000684: sub.i.v
00000688: call instance_create(argc=3)
00000690: popz
00000694: push.v direttorio
0000069C: push.d 247.5
000006A8: cmp.d.v >
000006AC: bf 0x20F5114
000006B0: push.v direttorio
000006B8: push.imm.e 270
000006BC: cmp.i.v <=
000006C0: bf 0x20F5114
000006C4: push.imm.e 287
000006C8: conv.i.v
000006CC: push.v y
000006D4: push.imm.e 266
000006D8: sub.i.v
000006DC: push.v x
000006E4: push.imm.e 6
000006E8: sub.i.v
000006EC: call instance_create(argc=3)
000006F4: popz
000006F8: push.v direttorio
00000700: push.imm.e 270
00000704: cmp.i.v >
00000708: bf 0x20F5178
0000070C: push.v direttorio
00000714: push.d 292.5
00000720: cmp.d.v <=
00000724: bf 0x20F5178
00000728: push.imm.e 287
0000072C: conv.i.v
00000730: push.v y
00000738: push.imm.e 267
0000073C: sub.i.v
00000740: push.v x
00000748: push.imm.e 22
0000074C: add.i.v
00000750: call instance_create(argc=3)
00000758: popz
0000075C: push.v direttorio
00000764: push.d 292.5
00000770: cmp.d.v >
00000774: bf 0x20F51DC
00000778: push.v direttorio
00000780: push.imm.e 315
00000784: cmp.i.v <=
00000788: bf 0x20F51DC
0000078C: push.imm.e 287
00000790: conv.i.v
00000794: push.v y
0000079C: push.imm.e 273
000007A0: sub.i.v
000007A4: push.v x
000007AC: push.imm.e 52
000007B0: add.i.v
000007B4: call instance_create(argc=3)
000007BC: popz
000007C0: push.v direttorio
000007C8: push.imm.e 315
000007CC: cmp.i.v >
000007D0: bf 0x20F5240
000007D4: push.v direttorio
000007DC: push.d 337.5
000007E8: cmp.d.v <=
000007EC: bf 0x20F5240
000007F0: push.imm.e 287
000007F4: conv.i.v
000007F8: push.v y
00000800: push.imm.e 288
00000804: sub.i.v
00000808: push.v x
00000810: push.imm.e 73
00000814: add.i.v
00000818: call instance_create(argc=3)
00000820: popz
00000824: push.v direttorio
0000082C: push.d 337.5
00000838: cmp.d.v >
0000083C: bf 0x20F52A4
00000840: push.v direttorio
00000848: push.imm.e 360
0000084C: cmp.i.v <=
00000850: bf 0x20F52A4
00000854: push.imm.e 287
00000858: conv.i.v
0000085C: push.v y
00000864: push.imm.e 302
00000868: sub.i.v
0000086C: push.v x
00000874: push.imm.e 82
00000878: add.i.v
0000087C: call instance_create(argc=3)
00000884: popz
00000888: push.imm.e 605
0000088C: pushenv 0x20F52B8
00000890: call action_kill_object(argc=0)
00000898: popz
0000089C: popenv 0x40F52AC
000008A0: push.imm.e 0
000008A4: conv.i.v
000008A8: call action_set_relative(argc=1)
000008B0: popz
000008B4: exit
000008B8: push.imm.e 156
000008BC: pushenv 0x20F5318
000008C0: push.imm.e 0
000008C4: conv.i.v
000008C8: push.imm.e 11
000008CC: conv.i.v
000008D0: push.v selec
000008D8: call action_if_variable(argc=3)
000008E0: pop.v.v local.__b__
000008E8: push.local.v local.__b__
000008F0: conv.v.b
000008F4: bf 0x20F5318
000008F8: b 0x20F5320
000008FC: popenv 0x40F52DC
00000900: b 0x20F5324
00000904: popenv 0x1CF5320
00000908: push.local.v local.__b__
00000910: conv.v.b
00000914: bf 0x20F5444
00000918: push.imm.e 156
0000091C: pushenv 0x20F537C
00000920: push.imm.e 4
00000924: conv.i.v
00000928: push.i 100000
00000930: conv.i.v
00000934: push.v mon
0000093C: call action_if_variable(argc=3)
00000944: pop.v.v local.__b__
0000094C: push.local.v local.__b__
00000954: conv.v.b
00000958: bf 0x20F537C
0000095C: b 0x20F5384
00000960: popenv 0x40F533C
00000964: b 0x20F5388
00000968: popenv 0x1CF5384
0000096C: push.local.v local.__b__
00000974: conv.v.b
00000978: bf 0x20F5444
0000097C: push.imm.e 0
00000980: conv.i.v
00000984: push.imm.e 0
00000988: conv.i.v
0000098C: push.imm.e 127
00000990: conv.i.v
00000994: call action_if_number(argc=3)
0000099C: pop.v.v local.__b__
000009A4: push.local.v local.__b__
000009AC: conv.v.b
000009B0: bf 0x20F5444
000009B4: push.imm.e 1
000009B8: pop.v.i redder
000009C0: push.imm.e 1
000009C4: conv.i.v
000009C8: call action_set_relative(argc=1)
000009D0: popz
000009D4: push.imm.e 0
000009D8: conv.i.v
000009DC: push.imm.e 0
000009E0: conv.i.v
000009E4: push.imm.e 127
000009E8: conv.i.v
000009EC: call action_create_object(argc=3)
000009F4: popz
000009F8: push.imm.e 0
000009FC: conv.i.v
00000A00: call action_set_relative(argc=1)
00000A08: popz
00000A0C: push.imm.e 9
00000A10: conv.i.v
00000A14: push.imm.e 2
00000A18: conv.i.v
00000A1C: call action_set_alarm(argc=2)
00000A24: popz
00000A28: push.imm.e 0
00000A2C: conv.i.v
00000A30: call action_set_relative(argc=1)
00000A38: popz