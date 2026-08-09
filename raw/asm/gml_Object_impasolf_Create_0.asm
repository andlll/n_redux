// gml_Object_impasolf_Create_0  locals=2 args=0 len=588
// locals: arguments, __b__
00000000: push.imm.e 455
00000004: pushenv 0x21490B4
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.imm.e 1
00000014: conv.i.v
00000018: push.v night
00000020: call action_if_variable(argc=3)
00000028: pop.v.v local.__b__
00000030: push.local.v local.__b__
00000038: conv.v.b
0000003C: bf 0x21490B4
00000040: b 0x21490BC
00000044: popenv 0x4149078
00000048: b 0x21490C0
0000004C: popenv 0x1D490BC
00000050: push.local.v local.__b__
00000058: conv.v.b
0000005C: bf 0x21490F0
00000060: push.imm.e 1
00000064: conv.i.v
00000068: push.i 16366009
00000070: conv.i.v
00000074: call action_sprite_color(argc=2)
0000007C: popz
00000080: push.imm.e 455
00000084: pushenv 0x2149134
00000088: push.imm.e 0
0000008C: conv.i.v
00000090: push.imm.e 1
00000094: conv.i.v
00000098: push.v dawn
000000A0: call action_if_variable(argc=3)
000000A8: pop.v.v local.__b__
000000B0: push.local.v local.__b__
000000B8: conv.v.b
000000BC: bf 0x2149134
000000C0: b 0x214913C
000000C4: popenv 0x41490F8
000000C8: b 0x2149140
000000CC: popenv 0x1D4913C
000000D0: push.local.v local.__b__
000000D8: conv.v.b
000000DC: bf 0x2149170
000000E0: push.imm.e 1
000000E4: conv.i.v
000000E8: push.i 15201023
000000F0: conv.i.v
000000F4: call action_sprite_color(argc=2)
000000FC: popz
00000100: push.v y
00000108: neg.v.d
0000010C: push.imm.e 2
00000110: sub.i.v
00000114: pop.v.v depth
0000011C: push.imm.e 0
00000120: conv.i.v
00000124: push.imm.e 405
00000128: conv.i.v
0000012C: call action_set_alarm(argc=2)
00000134: popz
00000138: push.imm.e 2
0000013C: conv.i.v
00000140: call action_if_dice(argc=1)
00000148: pop.v.v local.__b__
00000150: push.local.v local.__b__
00000158: conv.v.b
0000015C: bf 0x2149248
00000160: push.imm.e 2
00000164: conv.i.v
00000168: call action_if_dice(argc=1)
00000170: pop.v.v local.__b__
00000178: push.local.v local.__b__
00000180: conv.v.b
00000184: bf 0x2149220
00000188: push.imm.e 1
0000018C: conv.i.v
00000190: push.imm.e 0
00000194: conv.i.v
00000198: push.imm.e 295
0000019C: conv.i.v
000001A0: call action_sprite_set(argc=3)
000001A8: popz
000001AC: b 0x2149244
000001B0: push.imm.e 1
000001B4: conv.i.v
000001B8: push.imm.e 0
000001BC: conv.i.v
000001C0: push.imm.e 296
000001C4: conv.i.v
000001C8: call action_sprite_set(argc=3)
000001D0: popz
000001D4: b 0x21492BC
000001D8: push.imm.e 2
000001DC: conv.i.v
000001E0: call action_if_dice(argc=1)
000001E8: pop.v.v local.__b__
000001F0: push.local.v local.__b__
000001F8: conv.v.b
000001FC: bf 0x2149298
00000200: push.imm.e 1
00000204: conv.i.v
00000208: push.imm.e 0
0000020C: conv.i.v
00000210: push.imm.e 297
00000214: conv.i.v
00000218: call action_sprite_set(argc=3)
00000220: popz
00000224: b 0x21492BC
00000228: push.imm.e 1
0000022C: conv.i.v
00000230: push.imm.e 0
00000234: conv.i.v
00000238: push.imm.e 298
0000023C: conv.i.v
00000240: call action_sprite_set(argc=3)
00000248: popz