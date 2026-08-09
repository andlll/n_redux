// gml_Object_r12_Create_0  locals=2 args=0 len=2464
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 0
00000018: conv.i.v
0000001C: push.imm.e 0
00000020: conv.i.v
00000024: push.imm.e 0
00000028: conv.i.v
0000002C: call instance_create(argc=3)
00000034: popz
00000038: push.imm.e 0
0000003C: conv.i.v
00000040: push.imm.e 0
00000044: conv.i.v
00000048: push.imm.e 736
0000004C: conv.i.v
00000050: call action_if_number(argc=3)
00000058: pop.v.v local.__b__
00000060: push.local.v local.__b__
00000068: conv.v.b
0000006C: bf 0x20C44C4
00000070: push.imm.e 470
00000074: pushenv 0x20C4490
00000078: call action_kill_object(argc=0)
00000080: popz
00000084: popenv 0x40C4484
00000088: push.imm.e 471
0000008C: pushenv 0x20C44A8
00000090: call action_kill_object(argc=0)
00000098: popz
0000009C: popenv 0x40C449C
000000A0: push.imm.e 472
000000A4: pushenv 0x20C44C0
000000A8: call action_kill_object(argc=0)
000000B0: popz
000000B4: popenv 0x40C44B4
000000B8: push.imm.e 0
000000BC: pop.v.i noemi
000000C4: push.imm.e 1
000000C8: pop.v.i global.sca
000000D0: push.imm.e 0
000000D4: conv.i.v
000000D8: push.imm.e 0
000000DC: conv.i.v
000000E0: push.imm.e 736
000000E4: conv.i.v
000000E8: call action_if_number(argc=3)
000000F0: pop.v.v local.__b__
000000F8: push.local.v local.__b__
00000100: conv.v.b
00000104: bf 0x20C49AC
00000108: push.imm.e 1
0000010C: conv.i.v
00000110: call action_set_relative(argc=1)
00000118: popz
0000011C: push.imm.e 346
00000120: conv.i.v
00000124: push.imm.e 1170
00000128: conv.i.v
0000012C: push.imm.e 158
00000130: conv.i.v
00000134: call action_create_object(argc=3)
0000013C: popz
00000140: push.imm.e 0
00000144: conv.i.v
00000148: call action_set_relative(argc=1)
00000150: popz
00000154: push.imm.e 158
00000158: pushenv 0x20C4840
0000015C: push.imm.e 472
00000160: conv.i.v
00000164: push.v y
0000016C: push.imm.e 794
00000170: add.i.v
00000174: push.v x
0000017C: push.imm.e 282
00000180: add.i.v
00000184: call instance_create(argc=3)
0000018C: popz
00000190: push.imm.e 472
00000194: conv.i.v
00000198: push.v y
000001A0: push.imm.e 783
000001A4: add.i.v
000001A8: push.v x
000001B0: push.imm.e 439
000001B4: add.i.v
000001B8: call instance_create(argc=3)
000001C0: popz
000001C4: push.imm.e 472
000001C8: conv.i.v
000001CC: push.v y
000001D4: push.imm.e 748
000001D8: add.i.v
000001DC: push.v x
000001E4: push.imm.e 379
000001E8: add.i.v
000001EC: call instance_create(argc=3)
000001F4: popz
000001F8: push.imm.e 472
000001FC: conv.i.v
00000200: push.v y
00000208: push.imm.e 750
0000020C: add.i.v
00000210: push.v x
00000218: push.imm.e 518
0000021C: add.i.v
00000220: call instance_create(argc=3)
00000228: popz
0000022C: push.imm.e 472
00000230: conv.i.v
00000234: push.v y
0000023C: push.imm.e 700
00000240: add.i.v
00000244: push.v x
0000024C: push.imm.e 565
00000250: add.i.v
00000254: call instance_create(argc=3)
0000025C: popz
00000260: push.imm.e 472
00000264: conv.i.v
00000268: push.v y
00000270: push.imm.e 695
00000274: add.i.v
00000278: push.v x
00000280: push.imm.e 463
00000284: add.i.v
00000288: call instance_create(argc=3)
00000290: popz
00000294: push.imm.e 472
00000298: conv.i.v
0000029C: push.v y
000002A4: push.imm.e 646
000002A8: add.i.v
000002AC: push.v x
000002B4: push.imm.e 538
000002B8: add.i.v
000002BC: call instance_create(argc=3)
000002C4: popz
000002C8: push.imm.e 472
000002CC: conv.i.v
000002D0: push.v y
000002D8: push.imm.e 609
000002DC: add.i.v
000002E0: push.v x
000002E8: push.imm.e 637
000002EC: add.i.v
000002F0: call instance_create(argc=3)
000002F8: popz
000002FC: push.imm.e 472
00000300: conv.i.v
00000304: push.v y
0000030C: push.imm.e 556
00000310: add.i.v
00000314: push.v x
0000031C: push.imm.e 699
00000320: add.i.v
00000324: call instance_create(argc=3)
0000032C: popz
00000330: push.imm.e 472
00000334: conv.i.v
00000338: push.v y
00000340: push.imm.e 524
00000344: add.i.v
00000348: push.v x
00000350: push.imm.e 758
00000354: add.i.v
00000358: call instance_create(argc=3)
00000360: popz
00000364: push.imm.e 472
00000368: conv.i.v
0000036C: push.v y
00000374: push.imm.e 559
00000378: add.i.v
0000037C: push.v x
00000384: push.imm.e 816
00000388: add.i.v
0000038C: call instance_create(argc=3)
00000394: popz
00000398: push.imm.e 472
0000039C: conv.i.v
000003A0: push.v y
000003A8: push.imm.e 617
000003AC: add.i.v
000003B0: push.v x
000003B8: push.imm.e 724
000003BC: add.i.v
000003C0: call instance_create(argc=3)
000003C8: popz
000003CC: push.imm.e 472
000003D0: conv.i.v
000003D4: push.v y
000003DC: push.imm.e 659
000003E0: add.i.v
000003E4: push.v x
000003EC: push.imm.e 672
000003F0: add.i.v
000003F4: call instance_create(argc=3)
000003FC: popz
00000400: push.imm.e 472
00000404: conv.i.v
00000408: push.v y
00000410: push.imm.e 651
00000414: add.i.v
00000418: push.v x
00000420: push.imm.e 739
00000424: add.i.v
00000428: call instance_create(argc=3)
00000430: popz
00000434: popenv 0x40C4568
00000438: push.imm.e 858
0000043C: conv.i.v
00000440: push.imm.e 1951
00000444: conv.i.v
00000448: push.imm.e 165
0000044C: conv.i.v
00000450: call action_create_object(argc=3)
00000458: popz
0000045C: push.imm.e 1037
00000460: conv.i.v
00000464: push.imm.e 1632
00000468: conv.i.v
0000046C: push.imm.e 165
00000470: conv.i.v
00000474: call action_create_object(argc=3)
0000047C: popz
00000480: push.imm.e 1100
00000484: conv.i.v
00000488: push.imm.e 616
0000048C: conv.i.v
00000490: push.imm.e 104
00000494: conv.i.v
00000498: call action_create_object(argc=3)
000004A0: popz
000004A4: push.imm.e 1111
000004A8: conv.i.v
000004AC: push.imm.e 1655
000004B0: conv.i.v
000004B4: push.imm.e 105
000004B8: conv.i.v
000004BC: call action_create_object(argc=3)
000004C4: popz
000004C8: push.imm.e 1231
000004CC: conv.i.v
000004D0: push.imm.e 656
000004D4: conv.i.v
000004D8: push.imm.e 165
000004DC: conv.i.v
000004E0: call action_create_object(argc=3)
000004E8: popz
000004EC: push.imm.e 217
000004F0: conv.i.v
000004F4: push.imm.e 198
000004F8: conv.i.v
000004FC: push.imm.e 166
00000500: conv.i.v
00000504: call action_create_object(argc=3)
0000050C: popz
00000510: push.imm.e 34
00000514: conv.i.v
00000518: push.imm.e 514
0000051C: conv.i.v
00000520: push.imm.e 166
00000524: conv.i.v
00000528: call action_create_object(argc=3)
00000530: popz
00000534: push.imm.e 876
00000538: conv.i.v
0000053C: push.imm.e 44
00000540: conv.i.v
00000544: push.imm.e 167
00000548: conv.i.v
0000054C: call action_create_object(argc=3)
00000554: popz
00000558: push.imm.e 1142
0000055C: conv.i.v
00000560: push.imm.e 1015
00000564: conv.i.v
00000568: push.imm.e 167
0000056C: conv.i.v
00000570: call action_create_object(argc=3)
00000578: popz
0000057C: push.imm.e 845
00000580: conv.i.v
00000584: push.imm.e 769
00000588: conv.i.v
0000058C: push.imm.e 178
00000590: conv.i.v
00000594: call action_create_object(argc=3)
0000059C: popz
000005A0: push.imm.e 0
000005A4: conv.i.v
000005A8: push.imm.e 0
000005AC: conv.i.v
000005B0: push.imm.e 134
000005B4: conv.i.v
000005B8: call action_create_object(argc=3)
000005C0: popz
000005C4: push.imm.e 0
000005C8: pop.v.i exiting
000005D0: push.imm.e 10
000005D4: conv.i.v
000005D8: push.imm.e 60
000005DC: conv.i.v
000005E0: call action_set_alarm(argc=2)
000005E8: popz
000005EC: push.imm.e 11
000005F0: conv.i.v
000005F4: push.i 36000
000005FC: conv.i.v
00000600: call action_set_alarm(argc=2)
00000608: popz
0000060C: call randomize(argc=0)
00000614: popz
00000618: push.imm.e 400
0000061C: pop.v.i hap
00000624: push.imm.e 0
00000628: pop.v.i autocore
00000630: push.imm.e 0
00000634: pop.v.i allerta
0000063C: push.imm.e 0
00000640: pop.v.i selec
00000648: push.imm.e 0
0000064C: pop.v.i biotech
00000654: push.imm.e 7500
00000658: pop.v.i oil
00000660: push.imm.e 0
00000664: conv.i.v
00000668: push.imm.e 1
0000066C: conv.i.v
00000670: push.imm.e 736
00000674: conv.i.v
00000678: call action_if_number(argc=3)
00000680: pop.v.v local.__b__
00000688: push.local.v local.__b__
00000690: conv.v.b
00000694: bf 0x20C4AF0
00000698: push.imm.e 5000
0000069C: pop.v.i oil
000006A4: push.imm.e 1
000006A8: conv.i.v
000006AC: call action_set_relative(argc=1)
000006B4: popz
000006B8: push.v hap
000006C0: push.imm.e 200
000006C4: add.i.v
000006C8: pop.v.v hap
000006D0: push.imm.e 0
000006D4: conv.i.v
000006D8: call action_set_relative(argc=1)
000006E0: popz
000006E4: push.imm.e 0
000006E8: conv.i.v
000006EC: push.imm.e 0
000006F0: conv.i.v
000006F4: push.imm.e 711
000006F8: conv.i.v
000006FC: call action_create_object(argc=3)
00000704: popz
00000708: push.imm.e 0
0000070C: conv.i.v
00000710: push.imm.e 0
00000714: conv.i.v
00000718: push.imm.e 76
0000071C: conv.i.v
00000720: call action_create_object(argc=3)
00000728: popz
0000072C: push.imm.e 100
00000730: pop.v.i wewe
00000738: push.imm.e 0
0000073C: conv.i.v
00000740: push.imm.e 1
00000744: conv.i.v
00000748: push.imm.e 617
0000074C: conv.i.v
00000750: call action_if_number(argc=3)
00000758: pop.v.v local.__b__
00000760: push.local.v local.__b__
00000768: conv.v.b
0000076C: bf 0x20C4B8C
00000770: push.imm.e 200
00000774: pop.v.i ele
0000077C: b 0x20C4BA0
00000780: push.d 1e+21
0000078C: pop.v.d ele
00000794: push.imm.e 0
00000798: pop.v.i crys
000007A0: push.imm.e 5500
000007A4: pop.v.i mon
000007AC: push.imm.e 0
000007B0: pop.v.i spy
000007B8: push.imm.e 8
000007BC: conv.i.v
000007C0: push.imm.e 29000
000007C4: conv.i.v
000007C8: call action_set_alarm(argc=2)
000007D0: popz
000007D4: push.imm.e 0
000007D8: pop.v.i storm
000007E0: push.imm.e 0
000007E4: pop.v.i stormeasy
000007EC: push.imm.e 0
000007F0: pop.v.i pop
000007F8: push.imm.e 2914
000007FC: pop.v.i time
00000804: call randomize(argc=0)
0000080C: popz
00000810: push.imm.e 0
00000814: conv.i.v
00000818: push.imm.e 40
0000081C: conv.i.v
00000820: call action_set_alarm(argc=2)
00000828: popz
0000082C: push.imm.e 2
00000830: conv.i.v
00000834: push.imm.e 60
00000838: conv.i.v
0000083C: call action_set_alarm(argc=2)
00000844: popz
00000848: push.imm.e 1
0000084C: conv.i.v
00000850: push.imm.e 300
00000854: conv.i.v
00000858: call action_set_alarm(argc=2)
00000860: popz
00000864: push.imm.e 3
00000868: conv.i.v
0000086C: push.imm.e 3600
00000870: conv.i.v
00000874: call action_set_alarm(argc=2)
0000087C: popz
00000880: push.imm.e 0
00000884: pop.v.i onda
0000088C: push.imm.e 0
00000890: pop.v.i ondan
00000898: push.imm.e 0
0000089C: pop.v.i dara
000008A4: push.imm.e 0
000008A8: pop.v.i bombus
000008B0: push.imm.e 0
000008B4: pop.v.i bombolo
000008BC: push.imm.e 0
000008C0: pop.v.i bombn
000008C8: push.imm.e 0
000008CC: pop.v.i dirox
000008D4: push.imm.e 0
000008D8: pop.v.i diro
000008E0: push.imm.e 0
000008E4: pop.v.i diron
000008EC: push.imm.e 0
000008F0: pop.v.i arma
000008F8: push.imm.e 0
000008FC: conv.i.v
00000900: push.imm.e 0
00000904: conv.i.v
00000908: push.imm.e 8
0000090C: conv.i.v
00000910: call action_if_number(argc=3)
00000918: pop.v.v local.__b__
00000920: push.local.v local.__b__
00000928: conv.v.b
0000092C: bf 0x20C4D98
00000930: push.imm.e 0
00000934: conv.i.v
00000938: push.imm.e 0
0000093C: conv.i.v
00000940: push.v exiting
00000948: call action_if_variable(argc=3)
00000950: pop.v.v local.__b__
00000958: push.local.v local.__b__
00000960: conv.v.b
00000964: bf 0x20C4D98
00000968: push.imm.e 0
0000096C: conv.i.v
00000970: push.imm.e 0
00000974: conv.i.v
00000978: push.imm.e 157
0000097C: conv.i.v
00000980: call action_create_object(argc=3)
00000988: popz
0000098C: push.imm.e 0
00000990: conv.i.v
00000994: call action_set_relative(argc=1)
0000099C: popz