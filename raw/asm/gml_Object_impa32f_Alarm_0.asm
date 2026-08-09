// gml_Object_impa32f_Alarm_0  locals=2 args=0 len=1948
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 0
00000018: conv.i.v
0000001C: push.imm.e 0
00000020: conv.i.v
00000024: push.v demos
0000002C: call action_if_variable(argc=3)
00000034: pop.v.v local.__b__
0000003C: push.local.v local.__b__
00000044: conv.v.b
00000048: bf 0x2142630
0000004C: push.imm.e 0
00000050: conv.i.v
00000054: push.imm.e 24
00000058: conv.i.v
0000005C: call action_set_alarm(argc=2)
00000064: popz
00000068: push.imm.e 0
0000006C: conv.i.v
00000070: push.imm.e 18
00000074: conv.i.v
00000078: push.v phase
00000080: call action_if_variable(argc=3)
00000088: pop.v.v local.__b__
00000090: push.local.v local.__b__
00000098: conv.v.b
0000009C: bf 0x2142054
000000A0: push.imm.e 1
000000A4: conv.i.v
000000A8: call action_set_relative(argc=1)
000000B0: popz
000000B4: push.imm.e -72
000000B8: conv.i.v
000000BC: push.imm.e 67
000000C0: conv.i.v
000000C4: push.imm.e 488
000000C8: conv.i.v
000000CC: call action_create_object(argc=3)
000000D4: popz
000000D8: push.imm.e 0
000000DC: conv.i.v
000000E0: call action_set_relative(argc=1)
000000E8: popz
000000EC: push.v phase
000000F4: push.imm.e 1
000000F8: cmp.i.v ==
000000FC: bf 0x2142090
00000100: push.imm.e 94
00000104: pop.v.i sprite_index
0000010C: push.v phase
00000114: push.imm.e 1
00000118: add.i.v
0000011C: pop.v.v phase
00000124: exit
00000128: push.v phase
00000130: push.imm.e 2
00000134: cmp.i.v ==
00000138: bf 0x21420CC
0000013C: push.imm.e 92
00000140: pop.v.i sprite_index
00000148: push.v phase
00000150: push.imm.e 1
00000154: add.i.v
00000158: pop.v.v phase
00000160: exit
00000164: push.v phase
0000016C: push.imm.e 3
00000170: cmp.i.v ==
00000174: bf 0x2142108
00000178: push.imm.e 90
0000017C: pop.v.i sprite_index
00000184: push.v phase
0000018C: push.imm.e 1
00000190: add.i.v
00000194: pop.v.v phase
0000019C: exit
000001A0: push.v phase
000001A8: push.imm.e 4
000001AC: cmp.i.v ==
000001B0: bf 0x2142144
000001B4: push.imm.e 88
000001B8: pop.v.i sprite_index
000001C0: push.v phase
000001C8: push.imm.e 1
000001CC: add.i.v
000001D0: pop.v.v phase
000001D8: exit
000001DC: push.v phase
000001E4: push.imm.e 5
000001E8: cmp.i.v ==
000001EC: bf 0x2142180
000001F0: push.imm.e 86
000001F4: pop.v.i sprite_index
000001FC: push.v phase
00000204: push.imm.e 1
00000208: add.i.v
0000020C: pop.v.v phase
00000214: exit
00000218: push.v phase
00000220: push.imm.e 6
00000224: cmp.i.v ==
00000228: bf 0x21421BC
0000022C: push.imm.e 84
00000230: pop.v.i sprite_index
00000238: push.v phase
00000240: push.imm.e 1
00000244: add.i.v
00000248: pop.v.v phase
00000250: exit
00000254: push.v phase
0000025C: push.imm.e 7
00000260: cmp.i.v ==
00000264: bf 0x21421F8
00000268: push.imm.e 82
0000026C: pop.v.i sprite_index
00000274: push.v phase
0000027C: push.imm.e 1
00000280: add.i.v
00000284: pop.v.v phase
0000028C: exit
00000290: push.v phase
00000298: push.imm.e 8
0000029C: cmp.i.v ==
000002A0: bf 0x2142234
000002A4: push.imm.e 80
000002A8: pop.v.i sprite_index
000002B0: push.v phase
000002B8: push.imm.e 1
000002BC: add.i.v
000002C0: pop.v.v phase
000002C8: exit
000002CC: push.v phase
000002D4: push.imm.e 9
000002D8: cmp.i.v ==
000002DC: bf 0x2142270
000002E0: push.imm.e 78
000002E4: pop.v.i sprite_index
000002EC: push.v phase
000002F4: push.imm.e 1
000002F8: add.i.v
000002FC: pop.v.v phase
00000304: exit
00000308: push.v phase
00000310: push.imm.e 10
00000314: cmp.i.v ==
00000318: bf 0x21422AC
0000031C: push.imm.e 76
00000320: pop.v.i sprite_index
00000328: push.v phase
00000330: push.imm.e 1
00000334: add.i.v
00000338: pop.v.v phase
00000340: exit
00000344: push.v phase
0000034C: push.imm.e 11
00000350: cmp.i.v ==
00000354: bf 0x21422E8
00000358: push.imm.e 74
0000035C: pop.v.i sprite_index
00000364: push.v phase
0000036C: push.imm.e 1
00000370: add.i.v
00000374: pop.v.v phase
0000037C: exit
00000380: push.v phase
00000388: push.imm.e 12
0000038C: cmp.i.v ==
00000390: bf 0x2142324
00000394: push.imm.e 72
00000398: pop.v.i sprite_index
000003A0: push.v phase
000003A8: push.imm.e 1
000003AC: add.i.v
000003B0: pop.v.v phase
000003B8: exit
000003BC: push.v phase
000003C4: push.imm.e 13
000003C8: cmp.i.v ==
000003CC: bf 0x2142360
000003D0: push.imm.e 70
000003D4: pop.v.i sprite_index
000003DC: push.v phase
000003E4: push.imm.e 1
000003E8: add.i.v
000003EC: pop.v.v phase
000003F4: exit
000003F8: push.v phase
00000400: push.imm.e 14
00000404: cmp.i.v ==
00000408: bf 0x214239C
0000040C: push.imm.e 68
00000410: pop.v.i sprite_index
00000418: push.v phase
00000420: push.imm.e 1
00000424: add.i.v
00000428: pop.v.v phase
00000430: exit
00000434: push.v phase
0000043C: push.imm.e 15
00000440: cmp.i.v ==
00000444: bf 0x21423D8
00000448: push.imm.e 66
0000044C: pop.v.i sprite_index
00000454: push.v phase
0000045C: push.imm.e 1
00000460: add.i.v
00000464: pop.v.v phase
0000046C: exit
00000470: push.v phase
00000478: push.imm.e 16
0000047C: cmp.i.v ==
00000480: bf 0x2142414
00000484: push.imm.e 64
00000488: pop.v.i sprite_index
00000490: push.v phase
00000498: push.imm.e 1
0000049C: add.i.v
000004A0: pop.v.v phase
000004A8: exit
000004AC: push.v phase
000004B4: push.imm.e 17
000004B8: cmp.i.v ==
000004BC: bf 0x2142450
000004C0: push.imm.e 62
000004C4: pop.v.i sprite_index
000004CC: push.v phase
000004D4: push.imm.e 1
000004D8: add.i.v
000004DC: pop.v.v phase
000004E4: exit
000004E8: push.v phase
000004F0: push.imm.e 18
000004F4: cmp.i.v ==
000004F8: bf 0x214248C
000004FC: push.imm.e 60
00000500: pop.v.i sprite_index
00000508: push.v phase
00000510: push.imm.e 1
00000514: add.i.v
00000518: pop.v.v phase
00000520: exit
00000524: push.v phase
0000052C: push.imm.e 19
00000530: cmp.i.v ==
00000534: bf 0x21424C8
00000538: push.imm.e 58
0000053C: pop.v.i sprite_index
00000544: push.v phase
0000054C: push.imm.e 1
00000550: add.i.v
00000554: pop.v.v phase
0000055C: exit
00000560: push.v phase
00000568: push.imm.e 20
0000056C: cmp.i.v ==
00000570: bf 0x2142504
00000574: push.imm.e 56
00000578: pop.v.i sprite_index
00000580: push.v phase
00000588: push.imm.e 1
0000058C: add.i.v
00000590: pop.v.v phase
00000598: exit
0000059C: push.v phase
000005A4: push.imm.e 21
000005A8: cmp.i.v ==
000005AC: bf 0x2142540
000005B0: push.imm.e 54
000005B4: pop.v.i sprite_index
000005BC: push.v phase
000005C4: push.imm.e 1
000005C8: add.i.v
000005CC: pop.v.v phase
000005D4: exit
000005D8: push.v phase
000005E0: push.imm.e 22
000005E4: cmp.i.v ==
000005E8: bf 0x214257C
000005EC: push.imm.e 52
000005F0: pop.v.i sprite_index
000005F8: push.v phase
00000600: push.imm.e 1
00000604: add.i.v
00000608: pop.v.v phase
00000610: exit
00000614: push.v phase
0000061C: push.imm.e 23
00000620: cmp.i.v ==
00000624: bf 0x21425B8
00000628: push.imm.e 50
0000062C: pop.v.i sprite_index
00000634: push.v phase
0000063C: push.imm.e 1
00000640: add.i.v
00000644: pop.v.v phase
0000064C: exit
00000650: push.v phase
00000658: push.imm.e 24
0000065C: cmp.i.v ==
00000660: bf 0x21425F4
00000664: push.imm.e 48
00000668: pop.v.i sprite_index
00000670: push.v phase
00000678: push.imm.e 1
0000067C: add.i.v
00000680: pop.v.v phase
00000688: exit
0000068C: push.v phase
00000694: push.imm.e 25
00000698: cmp.i.v ==
0000069C: bf 0x2142630
000006A0: push.imm.e 46
000006A4: pop.v.i sprite_index
000006AC: push.v phase
000006B4: push.imm.e 1
000006B8: add.i.v
000006BC: pop.v.v phase
000006C4: exit
000006C8: push.imm.e 156
000006CC: pushenv 0x2142674
000006D0: push.imm.e 2
000006D4: conv.i.v
000006D8: push.imm.e -1000
000006DC: conv.i.v
000006E0: push.v ele
000006E8: call action_if_variable(argc=3)
000006F0: pop.v.v local.__b__
000006F8: push.local.v local.__b__
00000700: conv.v.b
00000704: bf 0x2142674
00000708: b 0x214267C
0000070C: popenv 0x4142638
00000710: b 0x2142680
00000714: popenv 0x1D4267C
00000718: push.local.v local.__b__
00000720: conv.v.b
00000724: bf 0x21426F0
00000728: push.imm.e 156
0000072C: pushenv 0x21426D4
00000730: push.imm.e 2
00000734: conv.i.v
00000738: push.imm.e -1000
0000073C: conv.i.v
00000740: push.v mon
00000748: call action_if_variable(argc=3)
00000750: pop.v.v local.__b__
00000758: push.local.v local.__b__
00000760: conv.v.b
00000764: bf 0x21426D4
00000768: b 0x21426DC
0000076C: popenv 0x4142698
00000770: b 0x21426E0
00000774: popenv 0x1D426DC
00000778: push.local.v local.__b__
00000780: conv.v.b
00000784: bf 0x21426F0
00000788: push.imm.e 0
0000078C: conv.i.v
00000790: call action_set_relative(argc=1)
00000798: popz