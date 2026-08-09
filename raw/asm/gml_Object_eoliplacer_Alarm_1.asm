// gml_Object_eoliplacer_Alarm_1  locals=2 args=0 len=1592
// locals: arguments, __b__
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 156
00000018: pushenv 0x213635C
0000001C: push.imm.e 0
00000020: conv.i.v
00000024: push.imm.e 82
00000028: conv.i.v
0000002C: push.v selec
00000034: call action_if_variable(argc=3)
0000003C: pop.v.v local.__b__
00000044: push.local.v local.__b__
0000004C: conv.v.b
00000050: bf 0x213635C
00000054: b 0x2136364
00000058: popenv 0x4136320
0000005C: b 0x2136368
00000060: popenv 0x1D36364
00000064: push.local.v local.__b__
0000006C: conv.v.b
00000070: bf 0x2136620
00000074: push.imm.e 156
00000078: pushenv 0x21363C0
0000007C: push.imm.e 4
00000080: conv.i.v
00000084: push.i 200000
0000008C: conv.i.v
00000090: push.v mon
00000098: call action_if_variable(argc=3)
000000A0: pop.v.v local.__b__
000000A8: push.local.v local.__b__
000000B0: conv.v.b
000000B4: bf 0x21363C0
000000B8: b 0x21363C8
000000BC: popenv 0x4136380
000000C0: b 0x21363CC
000000C4: popenv 0x1D363C8
000000C8: push.local.v local.__b__
000000D0: conv.v.b
000000D4: bf 0x21365A8
000000D8: push.imm.e 0
000000DC: conv.i.v
000000E0: push.imm.e 0
000000E4: conv.i.v
000000E8: push.v rav
000000F0: call action_if_variable(argc=3)
000000F8: pop.v.v local.__b__
00000100: push.local.v local.__b__
00000108: conv.v.b
0000010C: bf 0x2136500
00000110: push.imm.e 1
00000114: conv.i.v
00000118: push.imm.e 4
0000011C: conv.i.v
00000120: push.v places
00000128: call action_if_variable(argc=3)
00000130: pop.v.v local.__b__
00000138: push.local.v local.__b__
00000140: conv.v.b
00000144: bf 0x2136500
00000148: push.imm.e 0
0000014C: conv.i.v
00000150: push.imm.e 0
00000154: conv.i.v
00000158: push.imm.e 446
0000015C: conv.i.v
00000160: call action_create_object(argc=3)
00000168: popz
0000016C: push.imm.e 0
00000170: conv.i.v
00000174: call action_set_relative(argc=1)
0000017C: popz
00000180: push.imm.e 0
00000184: conv.i.v
00000188: push.imm.e 2
0000018C: conv.i.v
00000190: call action_set_alarm(argc=2)
00000198: popz
0000019C: push.imm.e 1
000001A0: conv.i.v
000001A4: call action_set_relative(argc=1)
000001AC: popz
000001B0: push.imm.e 0
000001B4: conv.i.v
000001B8: call action_set_relative(argc=1)
000001C0: popz
000001C4: push.imm.e 1
000001C8: pop.v.i rav
000001D0: push.imm.e 1
000001D4: conv.i.v
000001D8: call action_set_relative(argc=1)
000001E0: popz
000001E4: push.imm.e 0
000001E8: conv.i.v
000001EC: call action_set_relative(argc=1)
000001F4: popz
000001F8: exit
000001FC: push.imm.e 4
00000200: conv.i.v
00000204: push.imm.e 4
00000208: conv.i.v
0000020C: push.v places
00000214: call action_if_variable(argc=3)
0000021C: pop.v.v local.__b__
00000224: push.local.v local.__b__
0000022C: conv.v.b
00000230: bf 0x21365A8
00000234: push.imm.e 116
00000238: conv.i.v
0000023C: push.imm.e 0
00000240: conv.i.v
00000244: push.imm.e 483
00000248: conv.i.v
0000024C: call action_create_object(argc=3)
00000254: popz
00000258: push.imm.e 156
0000025C: pushenv 0x2136580
00000260: push.v mon
00000268: push.i -200000
00000270: add.i.v
00000274: pop.v.v mon
0000027C: popenv 0x4136564
00000280: call action_kill_object(argc=0)
00000288: popz
0000028C: push.imm.e 0
00000290: conv.i.v
00000294: call action_set_relative(argc=1)
0000029C: popz
000002A0: exit
000002A4: push.imm.e 156
000002A8: pushenv 0x21365F4
000002AC: push.imm.e 4
000002B0: conv.i.v
000002B4: push.i 50000
000002BC: conv.i.v
000002C0: push.v mon
000002C8: call action_if_variable(argc=3)
000002D0: pop.v.v local.__b__
000002D8: push.local.v local.__b__
000002E0: conv.v.b
000002E4: not.b.d
000002E8: bf 0x21365F4
000002EC: b 0x21365FC
000002F0: popenv 0x41365B0
000002F4: b 0x2136600
000002F8: popenv 0x1D365FC
000002FC: push.local.v local.__b__
00000304: conv.v.b
00000308: not.b.d
0000030C: bf 0x2136620
00000310: call action_kill_object(argc=0)
00000318: popz
0000031C: push.imm.e 156
00000320: pushenv 0x2136664
00000324: push.imm.e 0
00000328: conv.i.v
0000032C: push.imm.e 4
00000330: conv.i.v
00000334: push.v selec
0000033C: call action_if_variable(argc=3)
00000344: pop.v.v local.__b__
0000034C: push.local.v local.__b__
00000354: conv.v.b
00000358: bf 0x2136664
0000035C: b 0x213666C
00000360: popenv 0x4136628
00000364: b 0x2136670
00000368: popenv 0x1D3666C
0000036C: push.local.v local.__b__
00000374: conv.v.b
00000378: bf 0x2136928
0000037C: push.imm.e 156
00000380: pushenv 0x21366C8
00000384: push.imm.e 4
00000388: conv.i.v
0000038C: push.i 50000
00000394: conv.i.v
00000398: push.v mon
000003A0: call action_if_variable(argc=3)
000003A8: pop.v.v local.__b__
000003B0: push.local.v local.__b__
000003B8: conv.v.b
000003BC: bf 0x21366C8
000003C0: b 0x21366D0
000003C4: popenv 0x4136688
000003C8: b 0x21366D4
000003CC: popenv 0x1D366D0
000003D0: push.local.v local.__b__
000003D8: conv.v.b
000003DC: bf 0x21368B0
000003E0: push.imm.e 0
000003E4: conv.i.v
000003E8: push.imm.e 0
000003EC: conv.i.v
000003F0: push.v rav
000003F8: call action_if_variable(argc=3)
00000400: pop.v.v local.__b__
00000408: push.local.v local.__b__
00000410: conv.v.b
00000414: bf 0x2136808
00000418: push.imm.e 1
0000041C: conv.i.v
00000420: push.imm.e 4
00000424: conv.i.v
00000428: push.v places
00000430: call action_if_variable(argc=3)
00000438: pop.v.v local.__b__
00000440: push.local.v local.__b__
00000448: conv.v.b
0000044C: bf 0x2136808
00000450: push.imm.e 0
00000454: conv.i.v
00000458: push.imm.e 0
0000045C: conv.i.v
00000460: push.imm.e 446
00000464: conv.i.v
00000468: call action_create_object(argc=3)
00000470: popz
00000474: push.imm.e 0
00000478: conv.i.v
0000047C: call action_set_relative(argc=1)
00000484: popz
00000488: push.imm.e 0
0000048C: conv.i.v
00000490: push.imm.e 2
00000494: conv.i.v
00000498: call action_set_alarm(argc=2)
000004A0: popz
000004A4: push.imm.e 1
000004A8: conv.i.v
000004AC: call action_set_relative(argc=1)
000004B4: popz
000004B8: push.imm.e 0
000004BC: conv.i.v
000004C0: call action_set_relative(argc=1)
000004C8: popz
000004CC: push.imm.e 1
000004D0: pop.v.i rav
000004D8: push.imm.e 1
000004DC: conv.i.v
000004E0: call action_set_relative(argc=1)
000004E8: popz
000004EC: push.imm.e 0
000004F0: conv.i.v
000004F4: call action_set_relative(argc=1)
000004FC: popz
00000500: exit
00000504: push.imm.e 4
00000508: conv.i.v
0000050C: push.imm.e 4
00000510: conv.i.v
00000514: push.v places
0000051C: call action_if_variable(argc=3)
00000524: pop.v.v local.__b__
0000052C: push.local.v local.__b__
00000534: conv.v.b
00000538: bf 0x21368B0
0000053C: push.imm.e 0
00000540: conv.i.v
00000544: push.imm.e 0
00000548: conv.i.v
0000054C: push.imm.e 493
00000550: conv.i.v
00000554: call action_create_object(argc=3)
0000055C: popz
00000560: push.imm.e 156
00000564: pushenv 0x2136888
00000568: push.v mon
00000570: push.i -50000
00000578: add.i.v
0000057C: pop.v.v mon
00000584: popenv 0x413686C
00000588: call action_kill_object(argc=0)
00000590: popz
00000594: push.imm.e 0
00000598: conv.i.v
0000059C: call action_set_relative(argc=1)
000005A4: popz
000005A8: exit
000005AC: push.imm.e 156
000005B0: pushenv 0x21368FC
000005B4: push.imm.e 4
000005B8: conv.i.v
000005BC: push.i 50000
000005C4: conv.i.v
000005C8: push.v mon
000005D0: call action_if_variable(argc=3)
000005D8: pop.v.v local.__b__
000005E0: push.local.v local.__b__
000005E8: conv.v.b
000005EC: not.b.d
000005F0: bf 0x21368FC
000005F4: b 0x2136904
000005F8: popenv 0x41368B8
000005FC: b 0x2136908
00000600: popenv 0x1D36904
00000604: push.local.v local.__b__
0000060C: conv.v.b
00000610: not.b.d
00000614: bf 0x2136928
00000618: call action_kill_object(argc=0)
00000620: popz
00000624: push.imm.e 0
00000628: conv.i.v
0000062C: call action_set_relative(argc=1)
00000634: popz