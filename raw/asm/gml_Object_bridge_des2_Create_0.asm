// gml_Object_bridge_des2_Create_0  locals=2 args=0 len=552
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 455
00000018: pushenv 0x20CC198
0000001C: push.imm.e 0
00000020: conv.i.v
00000024: push.imm.e 1
00000028: conv.i.v
0000002C: push.v night
00000034: call action_if_variable(argc=3)
0000003C: pop.v.v local.__b__
00000044: push.local.v local.__b__
0000004C: conv.v.b
00000050: bf 0x20CC198
00000054: b 0x20CC1A0
00000058: popenv 0x40CC15C
0000005C: b 0x20CC1A4
00000060: popenv 0x1CCC1A0
00000064: push.local.v local.__b__
0000006C: conv.v.b
00000070: bf 0x20CC1D4
00000074: push.imm.e 1
00000078: conv.i.v
0000007C: push.i 16366009
00000084: conv.i.v
00000088: call action_sprite_color(argc=2)
00000090: popz
00000094: push.imm.e 455
00000098: pushenv 0x20CC218
0000009C: push.imm.e 0
000000A0: conv.i.v
000000A4: push.imm.e 1
000000A8: conv.i.v
000000AC: push.v dawn
000000B4: call action_if_variable(argc=3)
000000BC: pop.v.v local.__b__
000000C4: push.local.v local.__b__
000000CC: conv.v.b
000000D0: bf 0x20CC218
000000D4: b 0x20CC220
000000D8: popenv 0x40CC1DC
000000DC: b 0x20CC224
000000E0: popenv 0x1CCC220
000000E4: push.local.v local.__b__
000000EC: conv.v.b
000000F0: bf 0x20CC254
000000F4: push.imm.e 1
000000F8: conv.i.v
000000FC: push.i 15201023
00000104: conv.i.v
00000108: call action_sprite_color(argc=2)
00000110: popz
00000114: push.imm.e 0
00000118: conv.i.v
0000011C: push.imm.e 3600
00000120: conv.i.v
00000124: call action_set_alarm(argc=2)
0000012C: popz
00000130: push.imm.e 1
00000134: conv.i.v
00000138: call action_set_relative(argc=1)
00000140: popz
00000144: push.imm.e 0
00000148: conv.i.v
0000014C: push.imm.e 0
00000150: conv.i.v
00000154: push.imm.e 173
00000158: conv.i.v
0000015C: call action_create_object(argc=3)
00000164: popz
00000168: push.imm.e 0
0000016C: conv.i.v
00000170: call action_set_relative(argc=1)
00000178: popz
0000017C: push.imm.e 1
00000180: conv.i.v
00000184: call action_set_relative(argc=1)
0000018C: popz
00000190: push.imm.e 0
00000194: conv.i.v
00000198: push.imm.e 0
0000019C: conv.i.v
000001A0: push.imm.e 169
000001A4: conv.i.v
000001A8: call action_create_object(argc=3)
000001B0: popz
000001B4: push.imm.e 0
000001B8: conv.i.v
000001BC: call action_set_relative(argc=1)
000001C4: popz
000001C8: push.imm.e 1
000001CC: conv.i.v
000001D0: call action_set_relative(argc=1)
000001D8: popz
000001DC: push.imm.e 0
000001E0: conv.i.v
000001E4: push.imm.e 0
000001E8: conv.i.v
000001EC: push.imm.e 170
000001F0: conv.i.v
000001F4: call action_create_object(argc=3)
000001FC: popz
00000200: push.imm.e 0
00000204: conv.i.v
00000208: call action_set_relative(argc=1)
00000210: popz
00000214: push.imm.e 0
00000218: conv.i.v
0000021C: call action_set_relative(argc=1)
00000224: popz