// gml_Object_hapware_Step_0  locals=2 args=0 len=1144
// locals: arguments, __b__
00000000: call window_get_width(argc=0)
00000008: pop.v.v proto1
00000010: call window_get_height(argc=0)
00000018: pop.v.v proto2
00000020: push.v proto1
00000028: push.v proto2
00000030: cmp.v.v >
00000034: bf 0x213B664
00000038: push.imm.e 0
0000003C: pop.v.i global.upp
00000044: b 0x213B670
00000048: push.imm.e 0
0000004C: pop.v.i global.upp
00000054: push.imm.e 0
00000058: conv.i.v
0000005C: push.imm.e 0
00000060: conv.i.v
00000064: push.global.v global.sca
0000006C: push.d 0.62
00000078: mul.d.v
0000007C: push.global.v global.sca
00000084: push.d 0.62
00000090: mul.d.v
00000094: call action_sprite_transform(argc=4)
0000009C: popz
000000A0: push.imm.e -1
000000A4: push.imm.e 0
000000A8: push.v obj0.view_yview[array]
000000B0: push.imm.e 42
000000B4: push.global.v global.sca
000000BC: mul.v.i
000000C0: add.v.v
000000C4: push.global.v global.upp
000000CC: add.v.v
000000D0: push.imm.e -1
000000D4: push.imm.e 0
000000D8: push.v obj0.view_xview[array]
000000E0: push.imm.e 520
000000E4: push.global.v global.sca
000000EC: mul.v.i
000000F0: add.v.v
000000F4: call action_move_to(argc=2)
000000FC: popz
00000100: push.imm.e 0
00000104: conv.i.v
00000108: push.imm.e 0
0000010C: conv.i.v
00000110: push.global.v global.hc
00000118: call action_if_variable(argc=3)
00000120: pop.v.v local.__b__
00000128: push.local.v local.__b__
00000130: conv.v.b
00000134: bf 0x213B864
00000138: push.imm.e 156
0000013C: pushenv 0x213B798
00000140: push.imm.e 4
00000144: conv.i.v
00000148: push.v pop
00000150: push.v hap
00000158: call action_if_variable(argc=3)
00000160: pop.v.v local.__b__
00000168: push.local.v local.__b__
00000170: conv.v.b
00000174: bf 0x213B798
00000178: b 0x213B7A0
0000017C: popenv 0x413B75C
00000180: b 0x213B7A4
00000184: popenv 0x1D3B7A0
00000188: push.local.v local.__b__
00000190: conv.v.b
00000194: bf 0x213B7D8
00000198: push.imm.e 1
0000019C: conv.i.v
000001A0: push.imm.e 0
000001A4: conv.i.v
000001A8: push.imm.e 1322
000001AC: conv.i.v
000001B0: call action_sprite_set(argc=3)
000001B8: popz
000001BC: push.imm.e 156
000001C0: pushenv 0x213B820
000001C4: push.imm.e 4
000001C8: conv.i.v
000001CC: push.v pop
000001D4: push.v hap
000001DC: call action_if_variable(argc=3)
000001E4: pop.v.v local.__b__
000001EC: push.local.v local.__b__
000001F4: conv.v.b
000001F8: not.b.d
000001FC: bf 0x213B820
00000200: b 0x213B828
00000204: popenv 0x413B7E0
00000208: b 0x213B82C
0000020C: popenv 0x1D3B828
00000210: push.local.v local.__b__
00000218: conv.v.b
0000021C: not.b.d
00000220: bf 0x213B864
00000224: push.imm.e 1
00000228: conv.i.v
0000022C: push.imm.e 0
00000230: conv.i.v
00000234: push.imm.e 1325
00000238: conv.i.v
0000023C: call action_sprite_set(argc=3)
00000244: popz
00000248: push.imm.e 0
0000024C: conv.i.v
00000250: push.imm.e 1
00000254: conv.i.v
00000258: push.global.v global.hc
00000260: call action_if_variable(argc=3)
00000268: pop.v.v local.__b__
00000270: push.local.v local.__b__
00000278: conv.v.b
0000027C: bf 0x213B9AC
00000280: push.imm.e 156
00000284: pushenv 0x213B8E0
00000288: push.imm.e 4
0000028C: conv.i.v
00000290: push.v pop
00000298: push.v hap
000002A0: call action_if_variable(argc=3)
000002A8: pop.v.v local.__b__
000002B0: push.local.v local.__b__
000002B8: conv.v.b
000002BC: bf 0x213B8E0
000002C0: b 0x213B8E8
000002C4: popenv 0x413B8A4
000002C8: b 0x213B8EC
000002CC: popenv 0x1D3B8E8
000002D0: push.local.v local.__b__
000002D8: conv.v.b
000002DC: bf 0x213B920
000002E0: push.imm.e 1
000002E4: conv.i.v
000002E8: push.imm.e 0
000002EC: conv.i.v
000002F0: push.imm.e 1323
000002F4: conv.i.v
000002F8: call action_sprite_set(argc=3)
00000300: popz
00000304: push.imm.e 156
00000308: pushenv 0x213B968
0000030C: push.imm.e 4
00000310: conv.i.v
00000314: push.v pop
0000031C: push.v hap
00000324: call action_if_variable(argc=3)
0000032C: pop.v.v local.__b__
00000334: push.local.v local.__b__
0000033C: conv.v.b
00000340: not.b.d
00000344: bf 0x213B968
00000348: b 0x213B970
0000034C: popenv 0x413B928
00000350: b 0x213B974
00000354: popenv 0x1D3B970
00000358: push.local.v local.__b__
00000360: conv.v.b
00000364: not.b.d
00000368: bf 0x213B9AC
0000036C: push.imm.e 1
00000370: conv.i.v
00000374: push.imm.e 0
00000378: conv.i.v
0000037C: push.imm.e 1326
00000380: conv.i.v
00000384: call action_sprite_set(argc=3)
0000038C: popz
00000390: push.imm.e 156
00000394: pushenv 0x213B9F0
00000398: push.imm.e 3
0000039C: conv.i.v
000003A0: push.imm.e 0
000003A4: conv.i.v
000003A8: push.v oil
000003B0: call action_if_variable(argc=3)
000003B8: pop.v.v local.__b__
000003C0: push.local.v local.__b__
000003C8: conv.v.b
000003CC: bf 0x213B9F0
000003D0: b 0x213B9F8
000003D4: popenv 0x413B9B4
000003D8: b 0x213B9FC
000003DC: popenv 0x1D3B9F8
000003E0: push.local.v local.__b__
000003E8: conv.v.b
000003EC: bf 0x213BA50
000003F0: push.imm.e 0
000003F4: conv.i.v
000003F8: push.imm.e 0
000003FC: conv.i.v
00000400: push.imm.e 736
00000404: conv.i.v
00000408: call action_if_number(argc=3)
00000410: pop.v.v local.__b__
00000418: push.local.v local.__b__
00000420: conv.v.b
00000424: bf 0x213BA50
00000428: call action_kill_object(argc=0)
00000430: popz
00000434: push.imm.e 2
00000438: conv.i.v
0000043C: push.imm.e 0
00000440: conv.i.v
00000444: push.imm.e 8
00000448: conv.i.v
0000044C: call action_if_number(argc=3)
00000454: pop.v.v local.__b__
0000045C: push.local.v local.__b__
00000464: conv.v.b
00000468: bf 0x213BA94
0000046C: push.imm.e 518
00000470: pop.v.i sprite_index