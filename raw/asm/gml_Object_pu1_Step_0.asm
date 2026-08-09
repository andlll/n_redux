// gml_Object_pu1_Step_0  locals=2 args=0 len=1208
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 0
00000018: conv.i.v
0000001C: push.imm.e 0
00000020: conv.i.v
00000024: push.global.v global.sca
0000002C: push.global.v global.sca
00000034: call action_sprite_transform(argc=4)
0000003C: popz
00000040: push.v obj140.x
00000048: push.v obj141.x
00000050: sub.v.v
00000054: pop.v.v shifta
0000005C: push.imm.e 2
00000060: conv.i.v
00000064: push.imm.e 0
00000068: conv.i.v
0000006C: push.v shifta
00000074: call action_if_variable(argc=3)
0000007C: pop.v.v local.__b__
00000084: push.local.v local.__b__
0000008C: conv.v.b
00000090: bf 0x21DE074
00000094: push.imm.e 0
00000098: pop.v.i shifta
000000A0: push.imm.e 1
000000A4: conv.i.v
000000A8: push.imm.e -1000
000000AC: conv.i.v
000000B0: push.v shifta
000000B8: call action_if_variable(argc=3)
000000C0: pop.v.v local.__b__
000000C8: push.local.v local.__b__
000000D0: conv.v.b
000000D4: bf 0x21DE0B8
000000D8: push.imm.e -1000
000000DC: pop.v.i shifta
000000E4: push.imm.e 0
000000E8: conv.i.v
000000EC: push.imm.e 1
000000F0: conv.i.v
000000F4: push.v menoo
000000FC: call action_if_variable(argc=3)
00000104: pop.v.v local.__b__
0000010C: push.local.v local.__b__
00000114: conv.v.b
00000118: bf 0x21DE140
0000011C: push.imm.e -1
00000120: push.imm.e 0
00000124: push.v obj0.view_hview[array]
0000012C: push.imm.e -1
00000130: push.imm.e 0
00000134: push.v obj0.view_yview[array]
0000013C: add.v.v
00000140: push.imm.e -1
00000144: push.imm.e 0
00000148: push.v obj0.view_xview[array]
00000150: push.v shifta
00000158: add.v.v
0000015C: call action_move_to(argc=2)
00000164: popz
00000168: b 0x21DE15C
0000016C: push.imm.e -1000
00000170: conv.i.v
00000174: push.imm.e -1000
00000178: conv.i.v
0000017C: call action_move_to(argc=2)
00000184: popz
00000188: push.imm.e 0
0000018C: conv.i.v
00000190: push.imm.e 0
00000194: conv.i.v
00000198: push.v over
000001A0: call action_if_variable(argc=3)
000001A8: pop.v.v local.__b__
000001B0: push.local.v local.__b__
000001B8: conv.v.b
000001BC: bf 0x21DE240
000001C0: push.imm.e 156
000001C4: pushenv 0x21DE1D8
000001C8: push.imm.e 0
000001CC: conv.i.v
000001D0: push.imm.e 1
000001D4: conv.i.v
000001D8: push.v selec
000001E0: call action_if_variable(argc=3)
000001E8: pop.v.v local.__b__
000001F0: push.local.v local.__b__
000001F8: conv.v.b
000001FC: bf 0x21DE1D8
00000200: b 0x21DE1E0
00000204: popenv 0x41DE19C
00000208: b 0x21DE1E4
0000020C: popenv 0x1DDE1E0
00000210: push.local.v local.__b__
00000218: conv.v.b
0000021C: bf 0x21DE21C
00000220: push.imm.e 1
00000224: conv.i.v
00000228: push.imm.e 0
0000022C: conv.i.v
00000230: push.imm.e 495
00000234: conv.i.v
00000238: call action_sprite_set(argc=3)
00000240: popz
00000244: b 0x21DE240
00000248: push.imm.e 1
0000024C: conv.i.v
00000250: push.imm.e 0
00000254: conv.i.v
00000258: push.imm.e 493
0000025C: conv.i.v
00000260: call action_sprite_set(argc=3)
00000268: popz
0000026C: push.imm.e 2
00000270: conv.i.v
00000274: push.imm.e 49
00000278: conv.i.v
0000027C: push.v distrutti
00000284: call action_if_variable(argc=3)
0000028C: pop.v.v local.__b__
00000294: push.local.v local.__b__
0000029C: conv.v.b
000002A0: bf 0x21DE2FC
000002A4: push.imm.e 0
000002A8: conv.i.v
000002AC: push.imm.e 0
000002B0: conv.i.v
000002B4: push.imm.e 619
000002B8: conv.i.v
000002BC: call action_if_number(argc=3)
000002C4: pop.v.v local.__b__
000002CC: push.local.v local.__b__
000002D4: conv.v.b
000002D8: bf 0x21DE2FC
000002DC: push.imm.e 1
000002E0: conv.i.v
000002E4: call action_set_relative(argc=1)
000002EC: popz
000002F0: push.imm.e 0
000002F4: conv.i.v
000002F8: push.imm.e 0
000002FC: conv.i.v
00000300: push.imm.e 619
00000304: conv.i.v
00000308: call action_create_object(argc=3)
00000310: popz
00000314: push.imm.e 0
00000318: conv.i.v
0000031C: call action_set_relative(argc=1)
00000324: popz
00000328: push.imm.e 2
0000032C: conv.i.v
00000330: push.imm.e 0
00000334: conv.i.v
00000338: push.imm.e 190
0000033C: conv.i.v
00000340: call action_if_number(argc=3)
00000348: pop.v.v local.__b__
00000350: push.local.v local.__b__
00000358: conv.v.b
0000035C: bf 0x21DE478
00000360: push.imm.e 154
00000364: pushenv 0x21DE378
00000368: push.imm.e 2
0000036C: conv.i.v
00000370: push.imm.e 1
00000374: conv.i.v
00000378: push.v level
00000380: call action_if_variable(argc=3)
00000388: pop.v.v local.__b__
00000390: push.local.v local.__b__
00000398: conv.v.b
0000039C: bf 0x21DE378
000003A0: b 0x21DE380
000003A4: popenv 0x41DE33C
000003A8: b 0x21DE384
000003AC: popenv 0x1DDE380
000003B0: push.local.v local.__b__
000003B8: conv.v.b
000003BC: bf 0x21DE478
000003C0: push.imm.e 0
000003C4: conv.i.v
000003C8: push.imm.e 0
000003CC: conv.i.v
000003D0: push.imm.e 620
000003D4: conv.i.v
000003D8: call action_if_number(argc=3)
000003E0: pop.v.v local.__b__
000003E8: push.local.v local.__b__
000003F0: conv.v.b
000003F4: bf 0x21DE478
000003F8: push.imm.e 156
000003FC: pushenv 0x21DE410
00000400: push.imm.e 4
00000404: conv.i.v
00000408: push.imm.e 3000
0000040C: conv.i.v
00000410: push.v pop
00000418: call action_if_variable(argc=3)
00000420: pop.v.v local.__b__
00000428: push.local.v local.__b__
00000430: conv.v.b
00000434: bf 0x21DE410
00000438: b 0x21DE418
0000043C: popenv 0x41DE3D4
00000440: b 0x21DE41C
00000444: popenv 0x1DDE418
00000448: push.local.v local.__b__
00000450: conv.v.b
00000454: bf 0x21DE478
00000458: push.imm.e 1
0000045C: conv.i.v
00000460: call action_set_relative(argc=1)
00000468: popz
0000046C: push.imm.e 0
00000470: conv.i.v
00000474: push.imm.e 0
00000478: conv.i.v
0000047C: push.imm.e 620
00000480: conv.i.v
00000484: call action_create_object(argc=3)
0000048C: popz
00000490: push.imm.e 0
00000494: conv.i.v
00000498: call action_set_relative(argc=1)
000004A0: popz
000004A4: push.imm.e 0
000004A8: conv.i.v
000004AC: call action_set_relative(argc=1)
000004B4: popz