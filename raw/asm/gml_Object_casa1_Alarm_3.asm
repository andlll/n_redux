// gml_Object_casa1_Alarm_3  locals=2 args=0 len=1916
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 3
00000018: conv.i.v
0000001C: push.imm.e 120
00000020: conv.i.v
00000024: call action_set_alarm(argc=2)
0000002C: popz
00000030: push.imm.e 0
00000034: conv.i.v
00000038: push.imm.e 0
0000003C: conv.i.v
00000040: push.v ava
00000048: call action_if_variable(argc=3)
00000050: pop.v.v local.__b__
00000058: push.local.v local.__b__
00000060: conv.v.b
00000064: bf 0x20CFAB0
00000068: push.imm.e 455
0000006C: pushenv 0x20CF9F8
00000070: push.imm.e 0
00000074: conv.i.v
00000078: push.imm.e 1
0000007C: conv.i.v
00000080: push.v night
00000088: call action_if_variable(argc=3)
00000090: pop.v.v local.__b__
00000098: push.local.v local.__b__
000000A0: conv.v.b
000000A4: bf 0x20CF9F8
000000A8: b 0x20CFA00
000000AC: popenv 0x40CF9BC
000000B0: b 0x20CFA04
000000B4: popenv 0x1CCFA00
000000B8: push.local.v local.__b__
000000C0: conv.v.b
000000C4: bf 0x20CFA64
000000C8: push.imm.e 156
000000CC: pushenv 0x20CFA5C
000000D0: push.imm.e 1
000000D4: conv.i.v
000000D8: call action_set_relative(argc=1)
000000E0: popz
000000E4: push.v ele
000000EC: push.imm.e -2
000000F0: add.i.v
000000F4: pop.v.v ele
000000FC: push.imm.e 0
00000100: conv.i.v
00000104: call action_set_relative(argc=1)
0000010C: popz
00000110: popenv 0x40CFA1C
00000114: b 0x20CFAB0
00000118: push.imm.e 156
0000011C: pushenv 0x20CFAAC
00000120: push.imm.e 1
00000124: conv.i.v
00000128: call action_set_relative(argc=1)
00000130: popz
00000134: push.v ele
0000013C: push.imm.e -1
00000140: add.i.v
00000144: pop.v.v ele
0000014C: push.imm.e 0
00000150: conv.i.v
00000154: call action_set_relative(argc=1)
0000015C: popz
00000160: popenv 0x40CFA6C
00000164: push.imm.e 0
00000168: conv.i.v
0000016C: push.imm.e 1
00000170: conv.i.v
00000174: push.v ava
0000017C: call action_if_variable(argc=3)
00000184: pop.v.v local.__b__
0000018C: push.local.v local.__b__
00000194: conv.v.b
00000198: bf 0x20CFBE4
0000019C: push.imm.e 455
000001A0: pushenv 0x20CFB2C
000001A4: push.imm.e 0
000001A8: conv.i.v
000001AC: push.imm.e 1
000001B0: conv.i.v
000001B4: push.v night
000001BC: call action_if_variable(argc=3)
000001C4: pop.v.v local.__b__
000001CC: push.local.v local.__b__
000001D4: conv.v.b
000001D8: bf 0x20CFB2C
000001DC: b 0x20CFB34
000001E0: popenv 0x40CFAF0
000001E4: b 0x20CFB38
000001E8: popenv 0x1CCFB34
000001EC: push.local.v local.__b__
000001F4: conv.v.b
000001F8: bf 0x20CFB98
000001FC: push.imm.e 156
00000200: pushenv 0x20CFB90
00000204: push.imm.e 1
00000208: conv.i.v
0000020C: call action_set_relative(argc=1)
00000214: popz
00000218: push.v ele
00000220: push.imm.e -4
00000224: add.i.v
00000228: pop.v.v ele
00000230: push.imm.e 0
00000234: conv.i.v
00000238: call action_set_relative(argc=1)
00000240: popz
00000244: popenv 0x40CFB50
00000248: b 0x20CFBE4
0000024C: push.imm.e 156
00000250: pushenv 0x20CFBE0
00000254: push.imm.e 1
00000258: conv.i.v
0000025C: call action_set_relative(argc=1)
00000264: popz
00000268: push.v ele
00000270: push.imm.e -2
00000274: add.i.v
00000278: pop.v.v ele
00000280: push.imm.e 0
00000284: conv.i.v
00000288: call action_set_relative(argc=1)
00000290: popz
00000294: popenv 0x40CFBA0
00000298: push.imm.e 0
0000029C: conv.i.v
000002A0: push.imm.e 2
000002A4: conv.i.v
000002A8: push.v ava
000002B0: call action_if_variable(argc=3)
000002B8: pop.v.v local.__b__
000002C0: push.local.v local.__b__
000002C8: conv.v.b
000002CC: bf 0x20CFD18
000002D0: push.imm.e 455
000002D4: pushenv 0x20CFC60
000002D8: push.imm.e 0
000002DC: conv.i.v
000002E0: push.imm.e 1
000002E4: conv.i.v
000002E8: push.v night
000002F0: call action_if_variable(argc=3)
000002F8: pop.v.v local.__b__
00000300: push.local.v local.__b__
00000308: conv.v.b
0000030C: bf 0x20CFC60
00000310: b 0x20CFC68
00000314: popenv 0x40CFC24
00000318: b 0x20CFC6C
0000031C: popenv 0x1CCFC68
00000320: push.local.v local.__b__
00000328: conv.v.b
0000032C: bf 0x20CFCCC
00000330: push.imm.e 156
00000334: pushenv 0x20CFCC4
00000338: push.imm.e 1
0000033C: conv.i.v
00000340: call action_set_relative(argc=1)
00000348: popz
0000034C: push.v ele
00000354: push.imm.e -6
00000358: add.i.v
0000035C: pop.v.v ele
00000364: push.imm.e 0
00000368: conv.i.v
0000036C: call action_set_relative(argc=1)
00000374: popz
00000378: popenv 0x40CFC84
0000037C: b 0x20CFD18
00000380: push.imm.e 156
00000384: pushenv 0x20CFD14
00000388: push.imm.e 1
0000038C: conv.i.v
00000390: call action_set_relative(argc=1)
00000398: popz
0000039C: push.v ele
000003A4: push.imm.e -3
000003A8: add.i.v
000003AC: pop.v.v ele
000003B4: push.imm.e 0
000003B8: conv.i.v
000003BC: call action_set_relative(argc=1)
000003C4: popz
000003C8: popenv 0x40CFCD4
000003CC: push.imm.e 0
000003D0: conv.i.v
000003D4: push.imm.e 3
000003D8: conv.i.v
000003DC: push.v ava
000003E4: call action_if_variable(argc=3)
000003EC: pop.v.v local.__b__
000003F4: push.local.v local.__b__
000003FC: conv.v.b
00000400: bf 0x20CFE4C
00000404: push.imm.e 455
00000408: pushenv 0x20CFD94
0000040C: push.imm.e 0
00000410: conv.i.v
00000414: push.imm.e 1
00000418: conv.i.v
0000041C: push.v night
00000424: call action_if_variable(argc=3)
0000042C: pop.v.v local.__b__
00000434: push.local.v local.__b__
0000043C: conv.v.b
00000440: bf 0x20CFD94
00000444: b 0x20CFD9C
00000448: popenv 0x40CFD58
0000044C: b 0x20CFDA0
00000450: popenv 0x1CCFD9C
00000454: push.local.v local.__b__
0000045C: conv.v.b
00000460: bf 0x20CFE00
00000464: push.imm.e 156
00000468: pushenv 0x20CFDF8
0000046C: push.imm.e 1
00000470: conv.i.v
00000474: call action_set_relative(argc=1)
0000047C: popz
00000480: push.v ele
00000488: push.imm.e -8
0000048C: add.i.v
00000490: pop.v.v ele
00000498: push.imm.e 0
0000049C: conv.i.v
000004A0: call action_set_relative(argc=1)
000004A8: popz
000004AC: popenv 0x40CFDB8
000004B0: b 0x20CFE4C
000004B4: push.imm.e 156
000004B8: pushenv 0x20CFE48
000004BC: push.imm.e 1
000004C0: conv.i.v
000004C4: call action_set_relative(argc=1)
000004CC: popz
000004D0: push.v ele
000004D8: push.imm.e -4
000004DC: add.i.v
000004E0: pop.v.v ele
000004E8: push.imm.e 0
000004EC: conv.i.v
000004F0: call action_set_relative(argc=1)
000004F8: popz
000004FC: popenv 0x40CFE08
00000500: push.imm.e 0
00000504: conv.i.v
00000508: push.imm.e 4
0000050C: conv.i.v
00000510: push.v ava
00000518: call action_if_variable(argc=3)
00000520: pop.v.v local.__b__
00000528: push.local.v local.__b__
00000530: conv.v.b
00000534: bf 0x20CFF80
00000538: push.imm.e 455
0000053C: pushenv 0x20CFEC8
00000540: push.imm.e 0
00000544: conv.i.v
00000548: push.imm.e 1
0000054C: conv.i.v
00000550: push.v night
00000558: call action_if_variable(argc=3)
00000560: pop.v.v local.__b__
00000568: push.local.v local.__b__
00000570: conv.v.b
00000574: bf 0x20CFEC8
00000578: b 0x20CFED0
0000057C: popenv 0x40CFE8C
00000580: b 0x20CFED4
00000584: popenv 0x1CCFED0
00000588: push.local.v local.__b__
00000590: conv.v.b
00000594: bf 0x20CFF34
00000598: push.imm.e 156
0000059C: pushenv 0x20CFF2C
000005A0: push.imm.e 1
000005A4: conv.i.v
000005A8: call action_set_relative(argc=1)
000005B0: popz
000005B4: push.v ele
000005BC: push.imm.e -9
000005C0: add.i.v
000005C4: pop.v.v ele
000005CC: push.imm.e 0
000005D0: conv.i.v
000005D4: call action_set_relative(argc=1)
000005DC: popz
000005E0: popenv 0x40CFEEC
000005E4: b 0x20CFF80
000005E8: push.imm.e 156
000005EC: pushenv 0x20CFF7C
000005F0: push.imm.e 1
000005F4: conv.i.v
000005F8: call action_set_relative(argc=1)
00000600: popz
00000604: push.v ele
0000060C: push.imm.e -5
00000610: add.i.v
00000614: pop.v.v ele
0000061C: push.imm.e 0
00000620: conv.i.v
00000624: call action_set_relative(argc=1)
0000062C: popz
00000630: popenv 0x40CFF3C
00000634: push.imm.e 4
00000638: conv.i.v
0000063C: push.imm.e 5
00000640: conv.i.v
00000644: push.v ava
0000064C: call action_if_variable(argc=3)
00000654: pop.v.v local.__b__
0000065C: push.local.v local.__b__
00000664: conv.v.b
00000668: bf 0x20D00B4
0000066C: push.imm.e 455
00000670: pushenv 0x20CFFFC
00000674: push.imm.e 0
00000678: conv.i.v
0000067C: push.imm.e 1
00000680: conv.i.v
00000684: push.v night
0000068C: call action_if_variable(argc=3)
00000694: pop.v.v local.__b__
0000069C: push.local.v local.__b__
000006A4: conv.v.b
000006A8: bf 0x20CFFFC
000006AC: b 0x20D0004
000006B0: popenv 0x40CFFC0
000006B4: b 0x20D0008
000006B8: popenv 0x1CD0004
000006BC: push.local.v local.__b__
000006C4: conv.v.b
000006C8: bf 0x20D0068
000006CC: push.imm.e 156
000006D0: pushenv 0x20D0060
000006D4: push.imm.e 1
000006D8: conv.i.v
000006DC: call action_set_relative(argc=1)
000006E4: popz
000006E8: push.v ele
000006F0: push.imm.e -11
000006F4: add.i.v
000006F8: pop.v.v ele
00000700: push.imm.e 0
00000704: conv.i.v
00000708: call action_set_relative(argc=1)
00000710: popz
00000714: popenv 0x40D0020
00000718: b 0x20D00B4
0000071C: push.imm.e 156
00000720: pushenv 0x20D00B0
00000724: push.imm.e 1
00000728: conv.i.v
0000072C: call action_set_relative(argc=1)
00000734: popz
00000738: push.v ele
00000740: push.imm.e -6
00000744: add.i.v
00000748: pop.v.v ele
00000750: push.imm.e 0
00000754: conv.i.v
00000758: call action_set_relative(argc=1)
00000760: popz
00000764: popenv 0x40D0070
00000768: push.imm.e 0
0000076C: conv.i.v
00000770: call action_set_relative(argc=1)
00000778: popz