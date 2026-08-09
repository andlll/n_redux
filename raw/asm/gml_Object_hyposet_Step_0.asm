// gml_Object_hyposet_Step_0  locals=2 args=0 len=760
// locals: arguments, __b__
00000000: call window_get_width(argc=0)
00000008: pop.v.v proto1
00000010: call window_get_height(argc=0)
00000018: pop.v.v proto2
00000020: push.builtin.v os_type
00000028: push.imm.e 4
0000002C: cmp.i.v ==
00000030: bf 0x20BF588
00000034: push.v proto1
0000003C: push.v proto2
00000044: cmp.v.v >
00000048: bf 0x20BF57C
0000004C: push.imm.e 0
00000050: pop.v.i global.upp
00000058: b 0x20BF588
0000005C: push.imm.e 0
00000060: pop.v.i global.upp
00000068: push.imm.e 0
0000006C: conv.i.v
00000070: push.imm.e 0
00000074: conv.i.v
00000078: push.imm.e 156
0000007C: conv.i.v
00000080: call action_if_number(argc=3)
00000088: pop.v.v local.__b__
00000090: push.local.v local.__b__
00000098: conv.v.b
0000009C: bf 0x20BF5CC
000000A0: push.imm.e 1
000000A4: pop.v.i global.sca
000000AC: push.imm.e 0
000000B0: conv.i.v
000000B4: push.imm.e 4
000000B8: conv.i.v
000000BC: push.builtin.v os_type
000000C4: call action_if_variable(argc=3)
000000CC: pop.v.v local.__b__
000000D4: push.local.v local.__b__
000000DC: conv.v.b
000000E0: bf 0x20BF69C
000000E4: call window_get_width(argc=0)
000000EC: push.global.v global.sca
000000F4: mul.v.v
000000F8: push.d 0.5
00000104: mul.d.v
00000108: push.imm.e -1
0000010C: push.imm.e 0
00000110: pop.v.v obj0.view_wview[array]
00000118: call window_get_height(argc=0)
00000120: push.global.v global.sca
00000128: mul.v.v
0000012C: push.d 0.5
00000138: mul.d.v
0000013C: push.imm.e -1
00000140: push.imm.e 0
00000144: pop.v.v obj0.view_hview[array]
0000014C: call window_get_width(argc=0)
00000154: push.imm.e -1
00000158: push.imm.e 0
0000015C: pop.v.v obj0.view_wport[array]
00000164: call window_get_height(argc=0)
0000016C: push.imm.e -1
00000170: push.imm.e 0
00000174: pop.v.v obj0.view_hport[array]
0000017C: push.imm.e 0
00000180: conv.i.v
00000184: push.imm.e 0
00000188: conv.i.v
0000018C: push.builtin.v os_type
00000194: call action_if_variable(argc=3)
0000019C: pop.v.v local.__b__
000001A4: push.local.v local.__b__
000001AC: conv.v.b
000001B0: bf 0x20BF74C
000001B4: call window_get_width(argc=0)
000001BC: push.global.v global.sca
000001C4: mul.v.v
000001C8: push.imm.e -1
000001CC: push.imm.e 0
000001D0: pop.v.v obj0.view_wview[array]
000001D8: call window_get_height(argc=0)
000001E0: push.global.v global.sca
000001E8: mul.v.v
000001EC: push.imm.e -1
000001F0: push.imm.e 0
000001F4: pop.v.v obj0.view_hview[array]
000001FC: call window_get_width(argc=0)
00000204: push.imm.e -1
00000208: push.imm.e 0
0000020C: pop.v.v obj0.view_wport[array]
00000214: call window_get_height(argc=0)
0000021C: push.imm.e -1
00000220: push.imm.e 0
00000224: pop.v.v obj0.view_hport[array]
0000022C: push.imm.e 0
00000230: conv.i.v
00000234: push.imm.e 0
00000238: conv.i.v
0000023C: push.builtin.v os_type
00000244: call action_if_variable(argc=3)
0000024C: pop.v.v local.__b__
00000254: push.local.v local.__b__
0000025C: conv.v.b
00000260: bf 0x20BF818
00000264: push.imm.e -1
00000268: push.imm.e 0
0000026C: push.v obj0.view_wview[array]
00000274: push.imm.e 1280
00000278: cmp.i.v <
0000027C: bf 0x20BF7BC
00000280: push.imm.e 720
00000284: conv.i.v
00000288: push.imm.e 1280
0000028C: conv.i.v
00000290: call window_set_size(argc=2)
00000298: popz
0000029C: push.imm.e -1
000002A0: push.imm.e 0
000002A4: push.v obj0.view_hview[array]
000002AC: push.imm.e 720
000002B0: cmp.i.v <
000002B4: bf 0x20BF7F4
000002B8: push.imm.e 720
000002BC: conv.i.v
000002C0: push.imm.e 1280
000002C4: conv.i.v
000002C8: call window_set_size(argc=2)
000002D0: popz
000002D4: push.v proto2
000002DC: push.v proto1
000002E4: push.builtin.v application_surface
000002EC: call surface_resize(argc=3)
000002F4: popz